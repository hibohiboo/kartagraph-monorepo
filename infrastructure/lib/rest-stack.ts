import * as core from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import { LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import openApi from '../data/openapi.json';
import { getKeyMap } from '../util/customTypes';
import { convertPathList } from '../util/convertPathList';

interface Props extends core.StackProps {
  projectId: string;
  ssmLambdaLayerKey: string;
  ssmAPIGWUrlKey: string;
  apiVersion: string;
  neonEndpoint: string;
  cloundFrontDomain: string;
}
const HANDLER_DIR = '../backend/src/handlers/api';

const keyMap = getKeyMap(openApi.paths);

export class KartaGraphRESTAPIStack extends core.Stack {
  private apiRoot: apigateway.Resource;
  private resourceMap = new Map<string, apigateway.Resource>();

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);
    // APIGateway作成
    const restApi = this.createRestAPIGateway(props);

    const methodOptions = this.createMethodOptions({
      'method.request.header.Content-Type': true,
    });

    const commonEnv = {
      DATABASE_URL: props.neonEndpoint,
      CLOUND_FRONT_DOMAIN: props.cloundFrontDomain,
    }; // NEONへのアクセスを行うConnection String
    const defaultLambdaProps = this.createLambdaProps({
      ssmKeyForLambdaLayerArn: props.ssmLambdaLayerKey,
      environment: { ...commonEnv },
      timeoutSec: 30, // 外部エンドポイントを経由してJSONを処理するため3秒では足りない
    });

    // シナリオ永続化
    const putTagsLambda = this.createLambda({
      ...defaultLambdaProps,
      entry: `${HANDLER_DIR}/putTags.ts`,
      functionName: 'kartagraphPutTagsLambda',
      description: openApi.paths[keyMap['/tags']].put.summary,
    });
    const tagsResource = this.getResource(keyMap['/tags']);
    tagsResource.addMethod('PUT', new apigateway.LambdaIntegration(putTagsLambda), methodOptions);

    // タグ統計取得
    const getScnearioTagsLambda = this.createLambda({
      ...defaultLambdaProps,
      entry: `${HANDLER_DIR}/getTagsSummary.ts`,
      functionName: 'kartagraphGetTagsSummaryLambda',
      description: 'タグごとの個数を返却',
    });
    const scenarioTags = this.getResource(keyMap['/scenario/{scenarioId}/tags']);
    scenarioTags.addMethod('GET', new apigateway.LambdaIntegration(getScnearioTagsLambda), methodOptions);

    // シナリオ一覧取得
    const getScenarioLambda = this.createLambda({
      ...defaultLambdaProps,
      entry: `${HANDLER_DIR}/getScenarioList.ts`,
      functionName: 'getScenarioList',
      description: openApi.paths[keyMap['/scenario']].get.summary,
    });
    this.getResource(keyMap['/scenario']).addMethod(
      getKeyMap(openApi.paths[keyMap['/scenario']]).get,
      new apigateway.LambdaIntegration(getScenarioLambda),
      methodOptions,
    );
  }
  private createRestAPIGateway(props: Props) {
    const restApiName = `${props.projectId}-rest-api`;

    const restApi = new apigateway.RestApi(this, restApiName, {
      description: 'カルタグラフバックエンドRESTAPI',
      restApiName,
      endpointTypes: [apigateway.EndpointType.REGIONAL],
      deployOptions: {
        stageName: props.apiVersion,
      },
    });
    this.createUsagePlan(restApi, restApiName, props);

    // APIGatewayのURLをSSMに保存
    const parameter = new StringParameter(this, 'ssm-apigw-url', {
      parameterName: props.ssmAPIGWUrlKey,
      stringValue: restApi.url,
      description: 'kartagraph api gateway url for cloudfront',
    });
    core.Tags.of(parameter).add('Name', 'ssm-apigw-url');
    new core.CfnOutput(this, 'APIGatewayURL', {
      value: `${restApi.domainName}`,
    });

    this.apiRoot = restApi.root.addResource('api');
    return restApi;
  }
  private getResource(path: string): core.aws_apigateway.Resource {
    if (!this.apiRoot) throw new Error('restApi empty');
    const cache = this.resourceMap.get(path);
    if (cache) return cache;
    const pathList = convertPathList(path);
    for (const p of pathList) {
      const resourceNameList = p.split('/').filter((value) => value !== '');
      if (resourceNameList.length === 0) continue;
      if (resourceNameList.length === 1) {
        const resource = this.apiRoot.addResource(resourceNameList[0]);
        this.resourceMap.set(p, resource);
        continue;
      }
      const currentName = resourceNameList.pop();
      const parentResource = this.getResource(`/${resourceNameList.join('/')}`);
      if (!parentResource || !currentName) throw new Error('parentResource or currentName empty');
      const resource = parentResource.addResource(currentName);
      this.resourceMap.set(p, resource);
    }
    return this.resourceMap.get(path)!;
  }
  private createUsagePlan(restApi: apigateway.RestApi, apiName: string, props: Props) {
    // apiKeyを設定
    const apiKey = restApi.addApiKey('defaultKeys');
    const usagePlan = restApi.addUsagePlan(`${apiName}-usage-plan`, {
      quota: { limit: 2000, period: apigateway.Period.DAY },
      throttle: { burstLimit: 2, rateLimit: 1 },
    });
    usagePlan.addApiKey(apiKey);
    usagePlan.addApiStage({ stage: restApi.deploymentStage });

    // ------------------------------------------------------------
    // APIキーのIDを出力
    new core.CfnOutput(this, 'APIKey', {
      value: apiKey.keyId,
    });
  }

  private createLambdaProps(props: {
    ssmKeyForLambdaLayerArn: string;
    environment?: Record<string, string>;
    initialPolicy?: iam.PolicyStatement[];
    timeoutSec?: number;
  }) {
    const bundling = {
      externalModules: ['@neondatabase/serverless'],
    };
    const lambdaLayerArn = StringParameter.valueForStringParameter(this, props.ssmKeyForLambdaLayerArn);

    const layers = [LayerVersion.fromLayerVersionArn(this, 'node_modules-layer', lambdaLayerArn)];
    // 同じStack上でLayerVersionを作っていない場合、cdk synthで sam local 実行用のoutputを作るときにレイヤーを使うとエラーになる。
    const layerSettings = !!process.env['CDK_SYNTH'] ? {} : { bundling, layers };

    return {
      runtime: Runtime.NODEJS_20_X,
      ...layerSettings,
      environment: props.environment,
      initialPolicy: props.initialPolicy,
      timeout: props.timeoutSec ? core.Duration.seconds(props.timeoutSec) : undefined,
    };
  }

  private createLambda(props: core.aws_lambda_nodejs.NodejsFunctionProps) {
    if (!props.functionName) throw new Error('functionName empty');
    const func = new NodejsFunction(this, props.functionName, props);
    core.Tags.of(func).add('Name', props.functionName);
    return func;
  }
  private createMethodOptions(requestParameters: Record<string, boolean>): apigateway.MethodOptions {
    const responseParameters = {
      'method.response.header.Access-Control-Allow-Headers': true,
      'method.response.header.Access-Control-Allow-Methods': true,
      'method.response.header.Access-Control-Allow-Origin': true,
    };
    return {
      apiKeyRequired: true,
      requestParameters,
      methodResponses: [
        {
          statusCode: '200',
          responseParameters: {
            'method.response.header.Timestamp': true,
            'method.response.header.Content-Length': true,
            'method.response.header.Content-Type': true,
            ...responseParameters,
          },
        },
        {
          statusCode: '400',
          responseParameters,
        },
        {
          statusCode: '500',
          responseParameters,
        },
      ],
    };
  }
}

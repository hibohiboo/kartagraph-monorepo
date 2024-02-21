import * as cdk from 'aws-cdk-lib';
import {
  CachePolicy,
  OriginAccessIdentity,
  AllowedMethods,
  ViewerProtocolPolicy,
  CacheHeaderBehavior,
  Distribution,
  PriceClass,
  ResponseHeadersPolicy,
  HeadersFrameOption,
  HeadersReferrerPolicy,
  IDistribution,
  Function,
  FunctionCode,
  FunctionEventType,
  BehaviorOptions,
  IOrigin,
  CfnOriginAccessControl,
  CfnDistribution,
} from 'aws-cdk-lib/aws-cloudfront';
import { HttpOrigin, S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { BlockPublicAccess, Bucket, BucketProps, HttpMethods, IBucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
import { Fn } from 'aws-cdk-lib';
interface DeployPaths {
  path: string;
  alias: string;
}

interface Props extends cdk.StackProps {
  bucketName: string;
  oacName: string;
  defaultCachePolicyName: string;
  functionName: string;
  distributionName: string;
  projectNameTag: string;
  subDirectoryPath: DeployPaths[];
  ssmAPIGWUrlKey: string;
  apiVersion: string;
  xAPIKey: string;
  mediaBucketName: string;
}
const defaultPolicyOptionComment = 'カルタグラフ デフォルトポリシー';
const dataPolicyOptionComment = 'カルタグラフ データ部用ポリシー';
const distributionComment = '紙芝居型TRPG風電子ゲームブック カルタグラフ';
const functionCode = `
function handler(event) {
  var request = event.request;
  if(request.uri.includes('.')){
    return request;
  } else if(request.uri.startsWith('/app')) {
    request.uri = '/app/index.html';
  } else if(request.uri.startsWith('/editor')) {
    request.uri = '/editor/index.html';
  } else if (request.uri.endsWith('/')) {
    request.uri = request.uri + 'index.html';
  }
  return request;
}
`;
export class KartaGraphFrontCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);
    // CloudFront オリジン用のS3バケットを作成
    const bucket = this.createS3(props.bucketName);

    // 画像やシナリオデータ用のS3バケットを作成
    const mediaBucket = this.createS3(props.mediaBucketName, {
      cors: [{ allowedMethods: [HttpMethods.GET, HttpMethods.HEAD], allowedOrigins: ['*'], allowedHeaders: ['*'] }],
    });

    // CloudFront で設定する オリジンアクセスコントロール を作成
    const oac = this.createOAC(props.oacName);

    // CloudFrontディストリビューションを作成
    const distribution = this.createCloudFront(bucket, oac, props, mediaBucket);

    // S3バケットポリシーで、CloudFrontのオリジンアクセスコントロールを許可
    this.createPolicy(bucket, distribution);
    this.createPolicy(mediaBucket, distribution);

    // // 指定したディレクトリをデプロイ
    for (const item of props.subDirectoryPath) {
      this.deployS3(bucket, distribution, item.path, props.bucketName, item.alias);
      // 確認用にCloudFrontのURLに整形して出力
      new cdk.CfnOutput(this, `${props.distributionName}-${item.alias}-top-url`, {
        value: `https://${distribution.distributionDomainName}/${item.alias}/`,
      });
    }

    cdk.Tags.of(this).add('Project', props.projectNameTag);
  }
  private createS3(bucketName: string, options: BucketProps = {}) {
    const bucket = new Bucket(this, bucketName, {
      bucketName,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      ...options,
      // デフォルト = accessControl: BucketAccessControl.PRIVATE,
    });
    return bucket;
  }

  private createOAC(name: string) {
    const cfnOriginAccessControl = new CfnOriginAccessControl(this, name, {
      originAccessControlConfig: {
        name,
        originAccessControlOriginType: 's3',
        signingBehavior: 'always', // 推奨:CloudFront は S3 バケットオリジンに送信するすべてのリクエストに常に署名。
        signingProtocol: 'sigv4', // オリジンアクセスコントロールの署名プロトコル。有効な値は sigv4 のみ
        description: 'S3 Access Control',
      },
    });
    return cfnOriginAccessControl;
  }
  private createPolicy(bucket: Bucket, distribution: Distribution) {
    const myBucketPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['s3:GetObject', 's3:ListBucket'],
      principals: [new ServicePrincipal('cloudfront.amazonaws.com')],
      resources: [bucket.bucketArn + '/*', bucket.bucketArn],
    });
    bucket.addToResourcePolicy(myBucketPolicy);
    myBucketPolicy.addCondition('StringEquals', {
      'AWS:SourceArn': `arn:aws:cloudfront::${cdk.Stack.of(this).account}:distribution/${distribution.distributionId}`,
    });
  }
  private createCloudFront(bucket: Bucket, oac: CfnOriginAccessControl, props: Props, mediaBucket: Bucket) {
    const { defaultCachePolicyName, distributionName } = props;
    const defaultPolicyOption = {
      cachePolicyName: defaultCachePolicyName,
      comment: defaultPolicyOptionComment,
      enableAcceptEncodingGzip: true,
      enableAcceptEncodingBrotli: true,
    };
    const myCachePolicy = new CachePolicy(this, defaultCachePolicyName, defaultPolicyOption);

    const origin = new S3Origin(bucket);

    const spaRoutingFunction = new Function(this, 'SpaRoutingFunction', {
      functionName: props.functionName,
      // 拡張子が含まれないURLはSPAファイルにリダイレクト
      code: FunctionCode.fromInline(functionCode),
    });

    const responseHeadersPolicy = this.createResponseHeadersPolicy();
    const additionalBehaviors = this.createAdditionalBehaviors(origin, props, mediaBucket);
    const d = new Distribution(this, distributionName, {
      comment: distributionComment,
      defaultRootObject: '/index.html',
      priceClass: PriceClass.PRICE_CLASS_200,
      defaultBehavior: {
        origin,
        cachePolicy: myCachePolicy,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        responseHeadersPolicy,
        functionAssociations: [
          {
            eventType: FunctionEventType.VIEWER_REQUEST,
            function: spaRoutingFunction,
          },
        ],
      },
      additionalBehaviors,
    });
    cdk.Tags.of(d).add('Service', 'Cloud Front');

    this.settindDestribution(d, [bucket, mediaBucket], oac);

    return d;
  }

  private settindDestribution(d: Distribution, buckets: Bucket[], oac: CfnOriginAccessControl) {
    // Additional settings for origin 0 (0:appBucket, 1:mediaBucket)
    const cfnDistribution = d.node.defaultChild as CfnDistribution;
    buckets.forEach((b, i) => {
      // Delete OAI
      cfnDistribution.addOverride(`Properties.DistributionConfig.Origins.${i}.S3OriginConfig.OriginAccessIdentity`, '');
      // OAC does not require CustomOriginConfig
      cfnDistribution.addPropertyDeletionOverride(`DistributionConfig.Origins.${i}.CustomOriginConfig`);
      // By default, the s3 WebsiteURL is set and an error occurs, so set the S3 domain name
      cfnDistribution.addPropertyOverride(`DistributionConfig.Origins.${i}.DomainName`, b.bucketRegionalDomainName);
      // OAC settings
      cfnDistribution.addPropertyOverride(`DistributionConfig.Origins.${i}.OriginAccessControlId`, oac.getAtt('Id'));
    });
  }

  private createResponseHeadersPolicy() {
    const responseHeadersPolicy = new ResponseHeadersPolicy(this, 'ResponseHeadersPolicy', {
      securityHeadersBehavior: {
        contentTypeOptions: { override: true },
        frameOptions: {
          frameOption: HeadersFrameOption.SAMEORIGIN,
          override: true,
        },
        referrerPolicy: {
          referrerPolicy: HeadersReferrerPolicy.SAME_ORIGIN,
          override: true,
        },
        strictTransportSecurity: {
          accessControlMaxAge: cdk.Duration.seconds(63072000),
          includeSubdomains: true,
          preload: true,
          override: true,
        },
        xssProtection: {
          protection: true,
          modeBlock: true,
          override: true,
        },
      },
      corsBehavior: {
        accessControlAllowOrigins: ['https://ccfolia.com'],
        accessControlAllowHeaders: ['*'],
        accessControlAllowMethods: ['ALL'],
        accessControlAllowCredentials: false,
        originOverride: true,
      },
      customHeadersBehavior: {
        customHeaders: [
          {
            header: 'Cache-Control',
            value: 'no-cache',
            override: true,
          },
          {
            header: 'pragma',
            value: 'no-cache',
            override: true,
          },
          {
            header: 'server',
            value: '',
            override: true,
          },
        ],
      },
    });
    return responseHeadersPolicy;
  }
  private createAdditionalBehaviors(origin: IOrigin, props: Props, mediaBucket: Bucket): Record<string, BehaviorOptions> {
    const additionalBehaviors = {
      [`${props.apiVersion}/*`]: this.createAdditionBehaviorForAPIGW(props),
      'data/*': this.createAdditionBehaviorForData(origin, props),
      '/assets/*': {
        origin: new S3Origin(mediaBucket),
      },
    };
    return additionalBehaviors;
  }
  private createAdditionBehaviorForData(origin: IOrigin, props: Props): BehaviorOptions {
    return {
      origin,
      allowedMethods: AllowedMethods.ALLOW_ALL,
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      cachePolicy: new CachePolicy(this, `${props.distributionName}-data-cache-policy`, {
        cachePolicyName: `${props.distributionName}-data-cache-cache-policy`,
        comment: dataPolicyOptionComment,
        // defaultTtl: cdk.Duration.seconds(0),
        // maxTtl: cdk.Duration.seconds(10),
        headerBehavior: CacheHeaderBehavior.allowList('content-type'),
      }),
    };
  }
  private createAdditionBehaviorForAPIGW(props: Props): BehaviorOptions {
    const restApiUrl = StringParameter.valueForStringParameter(this, props.ssmAPIGWUrlKey);
    const apiEndPointUrlWithoutProtocol = Fn.select(1, Fn.split('://', restApiUrl));
    const apiEndPointDomainName = Fn.select(0, Fn.split('/', apiEndPointUrlWithoutProtocol));
    // accessControlAllowOrigins
    const ret: BehaviorOptions = {
      origin: new HttpOrigin(apiEndPointDomainName, {
        customHeaders: { 'x-api-key': props.xAPIKey },
      }),
      allowedMethods: AllowedMethods.ALLOW_ALL,
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,

      cachePolicy: new CachePolicy(this, `${props.distributionName}-rest-api-cache-policy`, {
        cachePolicyName: `${props.distributionName}-rest-api-cache-policy`,
        comment: 'CloudFront + ApiGateway用ポリシー',
        defaultTtl: cdk.Duration.seconds(0),
        maxTtl: cdk.Duration.seconds(10),
        headerBehavior: CacheHeaderBehavior.allowList('x-api-key', 'content-type'),
      }),
    };
    return ret;
  }

  private deployS3(siteBucket: IBucket, distribution: IDistribution, sourcePath: string, bucketName: string, basepath: string) {
    new BucketDeployment(this, `${bucketName}-deploy-with-invalidation-${basepath}`, {
      sources: [Source.asset(sourcePath)],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: [`/${basepath}/*`],
      destinationKeyPrefix: basepath,
    });
  }
}

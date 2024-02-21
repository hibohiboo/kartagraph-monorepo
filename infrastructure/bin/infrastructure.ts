#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import { KartaGraphFrontCdkStack } from '../lib/front-cdk';

dotenv.config({ path: './.env.local' });

const envList = ['PROJECT_ID', 'TAG_PROJECT_NAME', 'BUCKET_NAME', 'SSM_PARAM_KEY_API_URL', 'REST_API_VERSION', 'REST_API_X_API_KEY'] as const;
for (const key of envList) {
  if (!process.env[key]) throw new Error(`please add ${key} to .env`);
}
const processEnv = process.env as Record<(typeof envList)[number], string>;

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

new KartaGraphFrontCdkStack(app, `${processEnv.PROJECT_ID}-FrontCdkStack`, {
  bucketName: processEnv.BUCKET_NAME,
  oacName: `${processEnv.PROJECT_ID}-origin-access-control-to-s3-bucket`,
  defaultCachePolicyName: `${processEnv.PROJECT_ID}-cache-policy-default`,
  functionName: `${processEnv.PROJECT_ID}-lambda-edge-ogp`,
  distributionName: `${processEnv.PROJECT_ID}-distribution-cloudfront`,
  projectNameTag: processEnv.TAG_PROJECT_NAME,
  subDirectoryPath: [
    { path: '../app/dist', alias: 'app' },
    { path: '../editor/dist', alias: 'editor' },
  ],
  ssmAPIGWUrlKey: `${processEnv.SSM_PARAM_KEY_API_URL}-${processEnv.PROJECT_ID}`,
  apiVersion: processEnv.REST_API_VERSION,
  xAPIKey: `${processEnv.REST_API_X_API_KEY}`,
  env,
  crossRegionReferences: true,
  mediaBucketName: `${processEnv.PROJECT_ID}-media-bucket`,
});

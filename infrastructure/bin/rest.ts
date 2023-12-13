#!/usr/bin/env node
/* eslint-disable turbo/no-undeclared-env-vars */
import 'source-map-support/register';
import * as dotenv from 'dotenv';
import * as cdk from 'aws-cdk-lib';
import { KartaGraphRESTAPIStack } from '../lib/rest-stack';

dotenv.config({ path: './.env.local' });
const envList = [
  'PROJECT_ID',
  'SSM_PARAM_KEY_LAYER_VERSIONS_ARN',
  'SSM_PARAM_KEY_API_URL',
  'NEON_ENDPOINT',
  'REST_API_VERSION',
  'CLOUND_FRONT_DOMAIN',
] as const;
for (const key of envList) {
  if (!process.env[key]) throw new Error(`please add ${key} to .env`);
}
const processEnv = process.env as Record<(typeof envList)[number], string>;

const app = new cdk.App();
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

new KartaGraphRESTAPIStack(
  app,
  `${processEnv.PROJECT_ID}-KartaGraphRESTAPIStack`,
  {
    ssmLambdaLayerKey: `${processEnv.SSM_PARAM_KEY_LAYER_VERSIONS_ARN}-${processEnv.PROJECT_ID}`,
    ssmAPIGWUrlKey: `${processEnv.SSM_PARAM_KEY_API_URL}-${processEnv.PROJECT_ID}`,
    env,
    neonEndpoint: processEnv.NEON_ENDPOINT,
    projectId: processEnv.PROJECT_ID,
    apiVersion: processEnv.REST_API_VERSION,
    cloundFrontDomain: processEnv.CLOUND_FRONT_DOMAIN,
  },
);

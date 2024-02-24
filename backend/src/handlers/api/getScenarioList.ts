import { getScenarioList } from '@kartagraph-backend/domain/scenario/scenarioRepository';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log('headers', event.headers);
  const retJson = await getScenarioList();

  return {
    statusCode: 200,
    body: JSON.stringify(retJson),
  };
};

import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { execQuery } from '../../utils/repository';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify('body is requrired'),
    };
  }
  await execQuery(
    `insert into tag_history values ('sample','test2', 'シナリオ開始','scenario') on conflict do nothing`,
  );
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};

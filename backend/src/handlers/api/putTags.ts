import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { execQuery } from '../../utils/repository';
import type { TagHistory } from '@kartagraph-types/index';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify('body is requrired'),
    };
  }
  const tagHistory = JSON.parse(event.body) as TagHistory;
  const values = tagHistory.tags
    .map(
      (tag) =>
        `('${tagHistory.scenarioId}','${tagHistory.userId}','${tag.tagName}', '${tag.tagType}')`,
    )
    .join(',');
  await execQuery(
    `insert into tag_history values ${values} on conflict do nothing`,
  );
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};

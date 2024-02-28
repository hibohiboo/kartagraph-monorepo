import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { execQuery } from '../../utils/repository';
import type { TagHistory } from '@kartagraph-types/index';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log(event.headers);
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify('body is requrired'),
    };
  }
  if (event.headers.origin !== process.env.CLOUND_FRONT_DOMAIN) {
    return {
      statusCode: 403,
      body: JSON.stringify('access denied'),
    };
  }
  const tagHistory = JSON.parse(event.body) as TagHistory;
  console.log(tagHistory);
  const values = tagHistory.tags.map((tag) => `('${tagHistory.scenarioId}','${tagHistory.userId}','${tag.tagName}', '${tag.tagType}')`).join(',');
  await execQuery(`insert into tag_history values ${values} on conflict do nothing`);
  return {
    statusCode: 200,
    body: JSON.stringify({}),
  };
};

import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { execQuery } from '../../utils/repository';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  if (!event.pathParameters?.scenarioId) {
    return {
      statusCode: 400,
      body: JSON.stringify('scenarioId is requrired'),
    };
  }
  const ret = await execQuery(
    `SELECT tag_name, count(*) count FROM tag_history where scenario_id = '${event.pathParameters.scenarioId}' and tag_type <> 'secret' group by scenario_id, tag_name`,
  );
  return {
    statusCode: 200,
    body: JSON.stringify(
      ret.map((r) => ({ tagName: r.tag_name, userCount: Number(r.count) })),
    ),
  };
};

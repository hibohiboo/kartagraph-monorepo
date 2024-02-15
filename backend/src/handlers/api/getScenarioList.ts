import { ScenarioListItem } from '@kartagraph-types/index';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { execQuery } from '../../utils/repository';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log('headers', event.headers);
  const ret = await execQuery(
    `SELECT id
          , title
          , src
          , summary
          , detail
          , created
          , updated
       FROM scenario_list
   ORDER BY updated desc
    `,
  );
  const retJson = ret.map((r) => ({
    ...r,
  })) as ScenarioListItem[];
  return {
    statusCode: 200,
    body: JSON.stringify(retJson),
  };
};

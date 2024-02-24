import { execQuery } from '@kartagraph-backend/utils/repository';
import { scenario_listSchema } from '@kartagraph-prisma-zod';
import { ScenarioListItem } from '@kartagraph-types/index';

export const getScenarioList = async (): Promise<ScenarioListItem> => {
  const ret = await execQuery(
    `SELECT id
          , title
          , src
          , summary
          , detail
          , s3_key
          , created
          , updated
       FROM scenario_list
   ORDER BY updated desc
    `,
  );
  const retJson = ret.map((r) => scenario_listSchema.parse(r));
  return retJson;
};

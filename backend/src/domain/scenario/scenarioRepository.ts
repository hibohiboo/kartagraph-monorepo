import { execQuery } from '@kartagraph-backend/utils/repository';
import { ScenarioListItem } from '@kartagraph-types/index';
export const getScenarioList = async () => {
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
  const retJson = ret.map(
    (r): ScenarioListItem => ({
      id: r.id,
      title: r.title,
      src: r.src,
      summary: r.summary,
      detail: r.detail,
      s3_key: r.s3_key,
      created: new Date(r.created),
      updated: new Date(r.updated),
    }),
  );
  return retJson;
};

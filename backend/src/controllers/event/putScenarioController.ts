import { execQuery } from '@kartagraph-backend/utils/repository';
import type { ScenarioListItem } from '@kartagraph-types/index';

interface S3Record {
  s3: {
    object: { key: string };
  };
  eventTime: string;
}

export const putScenario = async (s3Json: unknown, record: S3Record) => {
  const { id, title, src, summary, detail } = s3Json as ScenarioListItem;

  await execQuery(`
insert into scenario_list (id,title,src,summary,detail,s3_key,created,updated) 
               values ('${id}','${title}','${src}','${summary}','${detail}','${record.s3.object.key}','${record.eventTime}','${record.eventTime}') 
  on conflict (id) 
  do update set 
      title = EXCLUDED.title,
        src = EXCLUDED.src,
    summary = EXCLUDED.summary,
     detail = EXCLUDED.detail,
     s3_key = EXCLUDED.s3_key,
    updated = EXCLUDED.updated;`);
  return;
};

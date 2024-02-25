import { execQuery } from '@kartagraph-backend/utils/repository';
import { scenario_listSchema } from '/opt/nodejs/index';

interface S3Record {
  s3: {
    object: { key: string };
  };
  eventTime: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const putScenario = async (s3Json: any, record: S3Record) => {
  const item = scenario_listSchema.parse({
    ...s3Json,
    s3_key: record.s3.object.key,
    created: record.eventTime,
    updated: record.eventTime,
  });
  const { id, title, src, summary, detail } = item;

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

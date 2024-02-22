import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { execQuery } from '@kartagraph-backend/utils/repository';
import { ScenarioListItem } from '@kartagraph-types/index';
import { S3Handler } from 'aws-lambda';

export const handler: S3Handler = async (e) => {
  const client = new S3Client({
    region: 'ap-northeast-1',
  });
  await Promise.all(
    e.Records.map(async (record) => {
      const s3Json = await getFromS3(client, {
        Bucket: record.s3.bucket.name,
        Key: record.s3.object.key,
      });

      if (!s3Json) {
        console.log('s3Json', record);
        return;
      }

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
    }),
  );
};

async function getFromS3(client: S3Client, input: { Bucket: string; Key: string }) {
  const data = await client.send(new GetObjectCommand(input));
  if (data.Body == null) {
    console.log('data.Body is null', input);
    return;
  }

  const bodyContents = await data.Body.transformToString();
  if (!bodyContents) {
    console.log('data.Body is empty', input);
    return;
  }

  const s3Json = JSON.parse(bodyContents) as ScenarioListItem;
  if (!s3Json) {
    console.log('s3Json', input);
    return;
  }
  return s3Json;
}

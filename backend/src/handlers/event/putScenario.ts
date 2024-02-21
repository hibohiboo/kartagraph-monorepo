import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { S3Handler } from 'aws-lambda';

export const handler: S3Handler = async (e) => {
  const client = new S3Client({
    region: 'ap-northeast-1',
  });
  await Promise.all(
    e.Records.map(async (record) => {
      const input = {
        Bucket: record.s3.bucket.name,
        Key: record.s3.object.key,
      };
      const command = new GetObjectCommand(input);
      const data = await client.send(command);
      if (data.Body == null) return;

      const bodyContents = await data.Body.transformToString();
      const event = JSON.parse(bodyContents);
      console.log('event', event);
      console.log('record', record);

      // const scenario = JSON.parse(event.body) as TagHistory;

      // await execQuery(`insert into tag_history values ${values} on conflict do nothing`);
    }),
  );
};

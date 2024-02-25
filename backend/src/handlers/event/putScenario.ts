import { S3Client } from '@aws-sdk/client-s3';
import { putScenario } from '@kartagraph-backend/controllers/event/putScenarioController';
import { getFromS3 } from '@kartagraph-backend/domain/s3/objectRepository';
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
        console.log('s3Json is empty', record);
        return;
      }
      await putScenario(s3Json, record);
    }),
  );
};

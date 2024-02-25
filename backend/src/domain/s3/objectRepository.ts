import { GetObjectCommand } from '@aws-sdk/client-s3';
import type { S3Client } from '@aws-sdk/client-s3';

export async function getFromS3(client: S3Client, input: { Bucket: string; Key: string }) {
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

  const s3Json = JSON.parse(bodyContents);
  if (!s3Json) {
    console.log('s3Json', input);
    return;
  }
  return s3Json;
}

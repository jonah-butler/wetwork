import { S3Client, ListObjectsV2Command, _Object } from "@aws-sdk/client-s3";

const wwAccessKey = process.env.VUE_APP_AWS_ACCESS_KEY || "";
const wwSecretKey = process.env.VUE_APP_AWS_SECRET_KEY || "";

const WW_BUCKET = "wetwork";
const WW_MUSIC_PREFIX = "music/";
const WW_ARN = process.env.VUE_APP_WETWORK_ARN || "";

const initClient = (): S3Client => {
  return new S3Client(
    {
      region: "us-east-1",
      credentials: {
        accessKeyId: wwAccessKey,
        secretAccessKey: wwSecretKey,
      },
    }
  );
};

const listAllObjects = async (bucket: string): Promise<_Object[]> => {
  try {
    const params = { Bucket: bucket, Prefix: WW_MUSIC_PREFIX, };

    const client = initClient();
    
    const response = await client.send(new ListObjectsV2Command(params));
    if(response.Contents) {
      // filter out directory entry
      return response.Contents.filter((r) => r.Key !== params.Prefix);
    }

    throw new Error("no objects found - bucket is empty");
  } catch(err) {
    if(err instanceof Error) {
      throw new Error("failed to fetch objects: " + err.message);
    }

    throw new Error("failed to fetch objects");
  }
};

export {
  WW_ARN,
  WW_BUCKET,
  listAllObjects,
  WW_MUSIC_PREFIX,
};


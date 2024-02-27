/*

import express, { Request, Response } from "express";
import AWS from "aws-sdk";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("preinit server.");
});

async function listObjects(bucketName: string): Promise<AWS.S3.Object[]> {
  try {
    const params = {
      Bucket: bucketName,
    };
    const data = await s3.listObjectsV2(params).promise();
    return data.Contents || [];
  } catch (err) {
    console.error("Error listing objects:", err);
    return [];
  }
}

async function copyObject(
  sourceBucket: string,
  sourceKey: string,
  destinationBucket: string,
  destinationKey: string,
  prefix: string
) {
  try {
    const params = {
      Bucket: destinationBucket,
      CopySource: `${sourceBucket}/${sourceKey}`,
      Key: `${prefix}/${destinationKey}`,
    };
    const result = await s3.copyObject(params).promise();
    console.log("File copied successfully:", result.CopyObjectResult);
  } catch (err) {
    console.error("Error copying object:", err);
  }
}

app.post("/pre_init", async (req: Request, res: Response) => {
  const { prefix } = req.body;
  const objectsToCopy = await listObjects("final-pt1");
  for (const object of objectsToCopy) {
    const sourceKey = object.Key!;
    const destinationKey = sourceKey;
    await copyObject(
      "final-pt1",
      sourceKey,
      "sandbox-b",
      destinationKey,
      prefix
    );
  }
  res.sendStatus(200);
});

app.listen(3002, () => {
  console.log("server running.");
});

*/
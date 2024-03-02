import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const client = new S3Client({
  region: "",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());



async function getFiles(language: string) {
  return new Promise((resolve, reject) => {
    fs.readdir(`../${language}`, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
}

async function uploadToS3(
  codebase_name: string,
  filePath: string,
  language: string
) {
  return new Promise<void>((resolve, reject) => {
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      fs.readdir(filePath, async (err, files) => {
        if (err) reject(err);
        const uploadPromises = files.map(async (file) => {
          const nestedFilePath = path.join(filePath, file);
          await uploadToS3(codebase_name, nestedFilePath, language);
        });
        await Promise.all(uploadPromises);
        resolve();
      });
    } else {
      fs.readFile(filePath, async (err, data) => {
        if (err) reject(err);
        const relativePath = path.relative(`../${language}`, filePath);
        const s3Key = `${codebase_name}/${relativePath}`;
        const command = new PutObjectCommand({
          Bucket: "sandbox-b",
          Key: s3Key,
          Body: data,
        });
        await client.send(command);
        resolve();
      });
    }
  });
}

app.post("/pre_init", async (req: Request, res: Response) => {
  const { codebase_name, language } = req.body;
  const files: any = await getFiles(language);
  const uploadPromises = files.map(async (file: string) =>
    uploadToS3(codebase_name, `../${language}/${file}`, language)
  );
  await Promise.all(uploadPromises);
  return res.sendStatus(200);
});

app.listen(3002, () => {
  console.log("server running.");
});

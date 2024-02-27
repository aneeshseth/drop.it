import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

const client = new S3Client({
  region: "",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});

export const main = async () => {
  fs.readdir("./node", (err, files) => {
    if (err) console.log(err);
    console.log(files);
  });
};

main();

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("preinit server.");
});

async function getFiles(language: string) {
  return new Promise((resolve, reject) => {
    fs.readdir(`./${language}`, (err, files) => {
      if (err) reject(err);
      console.log(files);
      resolve(files);
    });
  });
}

async function uploadToS3(
  codebase_name: string,
  file: string,
  language: string
) {
  return new Promise<void>((resolve, reject) => {
    console.log(language);
    console.log(file);
    fs.readFile(`./${language}/${file}`, async (err, data) => {
      if (err) reject(err);
      const command = new PutObjectCommand({
        Bucket: "sandbox-b",
        Key: `${codebase_name}/${file}`,
        Body: data,
      });
      await client.send(command);
      resolve();
    });
  });
}

app.post("/pre_init", async (req: Request, res: Response) => {
  const { codebase_name, language } = req.body;
  const files: any = await getFiles(language);
  const fileUploads = files.map(
    async (file: string) => await uploadToS3(codebase_name, file, language)
  );
  await Promise.all(fileUploads);
  return res.sendStatus(200);
});

app.listen(3002, () => {
  console.log("server running.");
});

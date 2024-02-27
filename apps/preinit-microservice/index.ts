import express, { Request, Response } from "express";
import fs from "fs";
import AWS from "aws-sdk";
import cors from "cors";
import dotenv from "dotenv";
import util from "util";

dotenv.config();
const app = express();
app.use(cors());

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: "sandbox-b" },
});

const readdirAsync = util.promisify(fs.readdir);
const readFileAsync = util.promisify(fs.readFile);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("preinit server.");
});

async function getBoilerplateFiles(language: string) {
  try {
    const files = await readdirAsync(`../${language}`);
    console.log(files);
    return files;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function addFileToS3(key: string, data: Buffer) {
  try {
    const params = {
      Key: key,
      Body: data,
      Bucket: "sandbox-b",
    };
    const result = await s3.upload(params).promise();
    console.log("File uploaded successfully:", result.Location);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
}

async function addFilesToS3(
  files: string[],
  language: string,
  codebaseName: string
) {
  for (const file of files) {
    const filePath = `../${language}/${file}`;
    try {
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        const nestedFiles = await readdirAsync(filePath);
        await addFilesToS3(nestedFiles, language, `${codebaseName}/${file}`);
      } else {
        const data = await readFileAsync(filePath);
        await addFileToS3(`${codebaseName}/${file}`, data);
      }
    } catch (err) {
      console.error(err);
    }
  }
}

app.post("/pre_init", async (req: Request, res: Response) => {
  const { codebase_name, language } = req.body;
  const filesToAdd = await getBoilerplateFiles(language);
  await addFilesToS3(filesToAdd, language, codebase_name);
  res.sendStatus(200);
});

app.listen(3002, () => {
  console.log("server running.");
});

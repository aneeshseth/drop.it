import express, { Request, Response } from "express";
const app = express();
import fs from "fs";
import AWS from "aws-sdk";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()
app.use(cors());



AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
});

const s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: "sandbox-b" },
});

app.use(express.json());

app.get("/", (req,res) => {
  res.send("preinit server.")
})

async function getBoilerplateFiles(langauge: string) {
  return new Promise((resolve, reject) => {
    fs.readdir(`../preinit-microservice/${langauge}`, async (err, files) => {
      if (err) {
        console.log(err);
      }
      console.log(files);
      resolve(files);
    });
  });
}

async function getCurrentFolder(boilerplate_path: string, file: string) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(`${boilerplate_path}/${file}`, async (err, files) => {
      if (err) console.log(err);
      resolve(files);
    });
  });
}

async function addNestedFolderToS3(
  codebase_name: string,
  file: string,
  filesToAdd: string[],
  boilerplate_path: string
) {
  const addition = filesToAdd.map((fileInDir) =>
    fs.readFile(
      `${boilerplate_path}/${file}/${fileInDir}`,
      async (err, data) => {
        if (err) console.log(err);
        const params = {
          Key: `${codebase_name}/${file}/${fileInDir}`,
          Body: data,
          Bucket: "sandbox-b",
        };
        await s3.upload(params, (err: any, data: any) => {
          if (err) {
            console.error("Error uploading file:", err);
          } else {
            console.log("File uploaded successfully:", data.Location);
          }
        });
      }
    )
  );
  await Promise.all(addition);
}

async function addFiles(
  files: string[],
  boilerplate_path: string,
  codebase_name: string
) {
  const filesAdditionToS3 = files.map(async (file) => {
    if (fs.lstatSync(`${boilerplate_path}/${file}`).isDirectory()) {
      const currentDirFiles = await getCurrentFolder(boilerplate_path, file);
      await addNestedFolderToS3(
        codebase_name,
        file,
        currentDirFiles,
        boilerplate_path
      );
      return;
    }
    fs.readFile(`${boilerplate_path}/${file}`, async (err, data) => {
      if (err) console.log(err);
      const params = {
        Key: `${codebase_name}/${file}`,
        Body: data,
        Bucket: "sandbox-b",
      };
      await s3.upload(params, (err: any, data: any) => {
        if (err) {
          console.error("Error uploading file:", err);
        } else {
          console.log("File uploaded successfully:", data.Location);
        }
      });
    });
  });
  await Promise.all(filesAdditionToS3);
}

app.post("/pre_init", async (req: Request, res: Response) => {
  const { codebase_name, language } = req.body;
  const boilerplate_path = `../preinit-microservice/${language}`;
  const filesToAdd = await getBoilerplateFiles(language);
  //@ts-ignore
  await addFiles(filesToAdd, boilerplate_path, codebase_name);
  res.sendStatus(200);
});

app.listen(3002, () => {
  console.log("server running.");
});

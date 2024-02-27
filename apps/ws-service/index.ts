import express, { Request, Response } from "express";
import { WebSocketServer } from "ws";
import { createServer } from "http";
import * as os from "node:os";
import * as pty from "node-pty";
import fs from "fs";
import cors from "cors";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to the ws service.");
});

const shell = os.platform() === "win32" ? "powershell.exe" : "bash";
const ptyProcess = pty.spawn(shell, [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: `${process.cwd()}/workspace`,
  env: process.env,
});

const commandProcessor = function (command: any) {
  return command;
};

const outputProcessor = function (output: any) {
  return output;
};

async function respondToCommmand(command: any) {
  var processedCommand = commandProcessor(command);
  ptyProcess.write(processedCommand);
}

async function fetchFiles(directoryFrom: string) {
  return new Promise((resolve, reject) => {
    fs.readdir(
      `workspace${directoryFrom}`,
      { withFileTypes: true },
      (err, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            files.map((file) => ({
              type: file.isDirectory() ? "dir" : "file",
              name: file.name,
              path:
                directoryFrom == "/"
                  ? `${file.name}`
                  : `${directoryFrom.substring(1, directoryFrom.length)}/${file.name}`,
            }))
          );
        }
      }
    );
  });
}

async function fetchFileContent(fileToGet: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(`workspace${fileToGet}`, "utf-8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

async function writeToFile(fileName: string, content: string) {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(`workspace${fileName}`, content, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}
wss.on("connection", async (ws) => {
  ws.on("message", async function (data) {
    const parsedData: any = JSON.parse(data.toString());
    if (parsedData.type == "terminal") {
      await respondToCommmand(parsedData.command);
    }
    if (parsedData.type == "fetchFilesRoot") {
      console.log('fetch files root.')
      const files = await fetchFiles(`${parsedData.dir}`);
      console.log(files)
      console.log(ws.emit(JSON.stringify({
        type: "filesFetchedRoot",
        files: files,
      })))
      console.log(ws)
      console.log(ws.send(
        JSON.stringify({
          type: "filesFetchedRoot",
          files: files,
        })
      ))
    }
    if (parsedData.type == "fetchFilesRootNow") {
      console.log('fetch files root.')
      const files = await fetchFiles(`${parsedData.dir}`);
      console.log(files)
      console.log(ws.emit(JSON.stringify({
        type: "filesFetchedRoot",
        files: files,
      })))
      ws.send("hello world")
    }
    if (parsedData.type == "fetchFilesSubRoot") {
      const files = await fetchFiles(`${parsedData.dir}`);
      ws.send(
        JSON.stringify({
          type: "filesFetchedSubRoot",
          files: files,
          dir: `${parsedData.dir}`,
        })
      );
    }
    if (parsedData.type == "fetchFileContent") {
      const fileContent = await fetchFileContent(parsedData.fileName);
      ws.send(
        JSON.stringify({
          type: "filecontent",
          content: fileContent,
        })
      );
    }
    if (parsedData.type == "updateFile") {
      await writeToFile(parsedData.fileName, parsedData.content);
    }
  });
  ptyProcess.onData((data) => {
    var processedOutput = outputProcessor(data);
    process.stdout.write(data);
    const obj = {
      type: "terminal",
      output: processedOutput,
    };
    ws.send(JSON.stringify(obj));
  });
});

server.listen(3001, () => {
  console.log("ws server listening.");
});

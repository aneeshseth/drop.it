"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_s3_1 = require("@aws-sdk/client-s3");
const fs_1 = __importDefault(require("fs"));
const client = new client_s3_1.S3Client({
  region: "",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});
const main = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    fs_1.default.readdir("./node", (err, files) => {
      if (err) console.log(err);
      console.log(files);
    });
  });
exports.main = main;
(0, exports.main)();
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
  res.send("preinit server.");
});
function getFiles(language) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      fs_1.default.readdir(`./${language}`, (err, files) => {
        if (err) reject(err);
        console.log(files);
        resolve(files);
      });
    });
  });
}
function uploadToS3(codebase_name, file, language) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
      console.log(language);
      console.log(file);
      fs_1.default.readFile(`./${language}/${file}`, (err, data) =>
        __awaiter(this, void 0, void 0, function* () {
          if (err) reject(err);
          const command = new client_s3_1.PutObjectCommand({
            Bucket: "sandbox-b",
            Key: `${codebase_name}/${file}`,
            Body: data,
          });
          yield client.send(command);
          resolve();
        })
      );
    });
  });
}
app.post("/pre_init", (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { codebase_name, language } = req.body;
    const files = yield getFiles(language);
    const fileUploads = files.map((file) =>
      __awaiter(void 0, void 0, void 0, function* () {
        return yield uploadToS3(codebase_name, file, language);
      })
    );
    yield Promise.all(fileUploads);
    return res.sendStatus(200);
  })
);
app.listen(3002, () => {
  console.log("server running.");
});

import express, { Request, Response } from "express";
import yaml from "yaml";
import fs from "fs";
import path from "path";
const app = express();
import {
  KubeConfig,
  AppsV1Api,
  CoreV1Api,
  NetworkingV1Api,
} from "@kubernetes/client-node";
import cors from "cors";

app.use(express.json());
app.use(cors());

const kubeconfig = new KubeConfig();
kubeconfig.loadFromDefault();
const coreV1Api = kubeconfig.makeApiClient(CoreV1Api);
const appsV1Api = kubeconfig.makeApiClient(AppsV1Api);
const networkingV1Api = kubeconfig.makeApiClient(NetworkingV1Api);

app.get("/", (req, res) => {
  res.send("welcome to the k8s service.");
});

app.post("/init", async (req: Request, res: Response) => {
  const { codebase_name, language } = req.body;
  const fileContent = fs.readFileSync(
    path.join(__dirname, "../k8s.yaml"),
    "utf8"
  );
  const parsedServices = yaml.parseAllDocuments(fileContent).map((doc) => {
    let docString = doc.toString();
    const regex2 = new RegExp(`container_name`, "g");
    const regex = new RegExp(`service_name`, "g");
    docString = docString.replace(regex, codebase_name);
    docString = docString.replace(regex2, `aneeshseth/${language}:latest`);
    console.log(docString);
    return yaml.parse(docString);
  });
  const initServices = parsedServices.map(async (kube) => {
    if (kube.kind == "Ingress") {
      console.log("imgress");
      await networkingV1Api.createNamespacedIngress("ingress-nginx", kube);
      return;
    }
    if (kube.kind == "Service") {
      console.log("service");
      await coreV1Api.createNamespacedService("ingress-nginx", kube);
      return;
    }
    if (kube.kind == "Deployment") {
      console.log("deploy,mentg5f ");
      await appsV1Api.createNamespacedDeployment("ingress-nginx", kube);
      return;
    }
  });
  await Promise.all(initServices);
  return res.sendStatus(200);
});

app.listen(3005, () => {
  console.log("my server is running.");
});

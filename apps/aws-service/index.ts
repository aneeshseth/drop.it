import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("preinit server.");
});

app.post("/pre_init", async (req: Request, res: Response) => {
  const { prefix } = req.body;

  res.sendStatus(200);
});

app.listen(3002, () => {
  console.log("server running.");
});

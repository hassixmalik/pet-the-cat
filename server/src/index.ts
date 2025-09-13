import "dotenv/config";
import express from "express";
import cors from "cors";
import { getTotal, incTotal } from "./redis";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/count", async (_req, res) => {
  const total = await getTotal();
  res.json({ total });
});

app.post("/api/pet", async (_req, res) => {
  const total = await incTotal(1);
  res.json({ total });
});

app.get("/healthz", (_req, res) => res.send("ok"));

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`server listening on :${port}`));

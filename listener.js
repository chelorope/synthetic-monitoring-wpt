import express from "express";
import dotenv from "dotenv";
import fs from "fs";

import WPT from "./WPTService.js";

dotenv.config();
const WPTService = new WPT();
const app = express();

app.get("/", async (req, res) => {
  const testId = req.query.id;
  const results = await WPTService.getJsonResults({ testId });
  await fs.promises.writeFile(
    `./results/${testId}.json`,
    JSON.stringify(results, null, 2)
  );
});

app.listen(3000, () => console.log("Server listening on port 3000!"));

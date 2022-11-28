import express from "express";
import dotenv from "dotenv";
import fs from "fs";

import WPT from "./WPTService.js";

dotenv.config();
const WPTService = new WPT();
const app = express();

app.get("/", async (req, res) => {
  const testId = req.query.id;
  console.log("QUERY", req.query, testId);
  const results = await WPTService.getJsonResults({ testId });
  console.log("TEST RESULT", results);
  await fs.promises.writeFile(
    `./results/${results}.json`,
    JSON.stringify(results, null, 2)
  );
});

app.listen(3000, () => console.log("Server listening on port 3000!"));

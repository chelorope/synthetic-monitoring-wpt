import express from "express";
import dotenv from "dotenv";
import fs from "fs";

import WPT from "./WPTService.js";

PORT = 3003;

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

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));

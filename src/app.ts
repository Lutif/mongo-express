import express from "express";
import { connectdb } from "./db";
import { router } from "./router";
import bodyParser from "body-parser";
import { cacheLimit, updateCurrentCount } from "./utils";

const PORT = process.env.PORT || 3000;
if (!process.env.CACHE_LIMIT) process.env.CACHE_LIMIT = cacheLimit;

export const main = async () => {
  connectdb();
  await updateCurrentCount()

  const app = express();
  app.use(bodyParser.json());

  app.use(router);

  app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
  });
};

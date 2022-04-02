import express from "express";
import { connectdb } from "./db"
import {router} from "./router"
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3000;

export const main = async () => {
  connectdb()

  const app = express();
  app.use(bodyParser.json())
  app.use(router)

  app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
  });
};


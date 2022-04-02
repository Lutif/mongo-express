import express from "express";
import { connectdb } from "./db"
import {router} from "./router"

const PORT = process.env.PORT || 3000;

export const main = async () => {
  const app = express();
  connectdb()
  app.use(router)

  app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
  });
};


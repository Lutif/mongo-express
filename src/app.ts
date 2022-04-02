import express,{ Request, Response} from "express";
import { connectdb, Todo } from "./db"
const PORT = process.env.PORT || 3000;


export const main = async () => {
  const app = express();
  connectdb()

  app.get("/",async (req:Request, res:Response) => {
req.baseUrl
    const todo = await Todo.create({title:"hello", description:"nice"})
  res.send(JSON.stringify(todo))
  })
  
  app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
  });
};


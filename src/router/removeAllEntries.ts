import { Request, Response } from "express"
import {CacheEntry} from "../db"

export const removeAllEntries = async (_: Request, res:Response) =>{
  //delete all entries
  try {
    const {deletedCount} = await CacheEntry.deleteMany()
    console.log({res})
    
    return res.send(`deleted ${deletedCount} objects`)
  } catch (error) {
    console.log(error);
    return res.status(error.code || 500).send({
      message: error.message || "something went wrong",
    });
  }
}
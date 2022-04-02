import { Request, Response } from "express"
import {CacheEntry} from "../db"
import { BadRequest } from "http-errors";
import { CacheEntryType, ttlExpired, genHexString } from "../utils";


export const createOrUpdateCacheEntries = async (req: Request, res:Response) =>{
  
  try {
    const { key } = req.params;
    const { data } = req.body 
    if (!key || !data) throw new BadRequest(`Missing ${!key? "Key":"data"} input`);

    let entry: CacheEntryType;

    entry = await CacheEntry.findByIdAndUpdate(key, { data }).lean();
    if (!entry) {
      console.log("Cache miss");
      entry = await CacheEntry.create({ _id: key, data },);
    } else {
      console.log("Cache hit");
    }

    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(error.code || 500).send({
      message: error.message || "something went wrong",
    });
  }
}
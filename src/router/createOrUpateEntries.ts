import { Request, Response } from "express"
import {CacheEntry} from "../db"
import { BadRequest } from "http-errors";
import { CacheEntryType, deleteOneEntry, genHexString, ttlExpired, updateCurrentCount } from "../utils";


export const createOrUpdateCacheEntries = async (req: Request, res:Response) =>{
  
  try {
    const { key } = req.params;
    const { data } = req.body 
    if (!key || !data) throw new BadRequest(`Missing ${!key? "Key":"data"} input`);

    let entry: CacheEntryType;

    entry = await CacheEntry.findById(key).lean();

    if (!entry) {
      console.log("Cache miss");
      if (
        Number(process.env.CACHE_CURRENT_COUNT) >=
        Number(process.env.CACHE_LIMIT)
      ) {
        await deleteOneEntry();
      }
      entry = await CacheEntry.create({ _id: key, data, hitsForTTL: 1},);
      await updateCurrentCount(
        Number(process.env.CACHE_CURRENT_COUNT) + 1
      )
    } else {
      if (ttlExpired(entry.updatedAt)) {
        entry = await CacheEntry.findByIdAndUpdate(key, {
          data: genHexString(22),
          hitsForTTL: 1
        }).lean();
      } else await CacheEntry.findByIdAndUpdate(key, { hitsForTTL: Number(entry.hitsForTTL)+1})
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
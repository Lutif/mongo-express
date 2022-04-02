import { Request, Response } from "express";
import { CacheEntry } from "../db";
import { BadRequest } from "http-errors";
import {
  CacheEntryType,
  ttlExpired,
  genHexString,
  updateCurrentCount,
  deleteOneEntry,
} from "../utils";

export const getCacheEntry = async (req: Request, res: Response) => {
  //@todo: add limit logic
  try {
    const { key } = req.params;
    if (!key) throw new BadRequest("Missing key input");

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

      entry = await CacheEntry.create({ _id: key, hitsForTTL:1 });

      await updateCurrentCount(Number(process.env.CACHE_CURRENT_COUNT) + 1);
    } else {

      console.log("Cache hit");
      if (ttlExpired(entry.updatedAt)) {
        entry = await CacheEntry.findByIdAndUpdate(key, {
          data: genHexString(22),
          hitsForTTL: 1
        }).lean();
      }else{
        await CacheEntry.findByIdAndUpdate(key, { hitsForTTL: Number(entry.hitsForTTL)+1})
      }
    }

    return res.send(entry.data);
  } catch (error) {
    console.log(error);
    return res.status(error.code || 500).send({
      message: error.message || "something went wrong",
    });
  }
};

import { Request, Response } from "express";
import { CacheEntry } from "../db";
import { BadRequest } from "http-errors";
import { CacheEntryType, ttlExpired, genHexString } from "../utils";

export const getCacheEntry = async (req: Request, res: Response) => {
//@todo: add limit logic
  try {
    const { key } = req.params;
    if (!key) throw new BadRequest("Missing key input");

    let entry: CacheEntryType;

    entry = await CacheEntry.findByIdAndUpdate(key, {}).lean();
    if (!entry) {
      console.log("Cache miss");
      entry = await CacheEntry.create({ _id: key });
    } else {
      console.log("Cache hit");
      if (ttlExpired(entry.updatedAt)) {
        entry = await CacheEntry.findByIdAndUpdate(key,{data:genHexString(22)}).lean()
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

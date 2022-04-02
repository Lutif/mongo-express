import { Request, Response } from "express";
import { CacheEntry } from "../db";
import { CacheEntryType } from "../utils";
import { NotFound } from "http-errors";

export const getCacheKey = async (_: Request, res: Response) => {
  try {
    const cacheEntries: CacheEntryType[] = await CacheEntry.find().lean();
    if (!cacheEntries.length) throw new NotFound("Cache is empty");

    return res.json(cacheEntries.map((item) => item._id));
  } catch (error) {
    console.log(error);
    return res.status(error.code || 500).send({
      message: error.message || "something went wrong",
    });
  }
};

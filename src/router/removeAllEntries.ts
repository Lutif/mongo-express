import { Request, Response } from "express";
import { updateCurrentCount } from "../utils";
import { CacheEntry } from "../db";

export const removeAllEntries = async (_: Request, res: Response) => {
  try {
    const { deletedCount } = await CacheEntry.deleteMany();

    await updateCurrentCount(
      Number(process.env.CACHE_CURRENT_COUNT) - (deletedCount || 0)
    );

    return res.send(`deleted ${deletedCount} objects`);
  } catch (error) {
    console.log(error);
    return res.status(error.code || 500).send({
      message: error.message || "something went wrong",
    });
  }
};

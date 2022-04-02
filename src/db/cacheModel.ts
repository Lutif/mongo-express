import mongoose from "mongoose";
import { genHexString } from "../utils";

const cacheSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toHexString(),
    },
    data: {
      type: String,
      default: () => genHexString(22)
    },
    hitsForTTL: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export const CacheEntry = mongoose.model("cache", cacheSchema);

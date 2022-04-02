import { defaultTTL } from "./constants";
import { CacheEntry } from "../db";
import {CacheEntryType} from ".//cacheEntery.type"

export const genHexString = (len: number): string => {
  const hex = "0123456789ABCDEF";
  let output = "";
  for (let i = 0; i < len; ++i) {
    output += hex.charAt(Math.floor(Math.random() * hex.length));
  }
  return output;
};

export const ttlExpired = (lastUpdateAt: string) => {
  const ttl = process.env.TTL || defaultTTL;
  const now = new Date().getTime();
  const lastUpdated = new Date(lastUpdateAt).getTime();
  return now - lastUpdated > ttl;
};

export const updateCurrentCount = async (currentCount?: number) => {
  if (currentCount) {
    process.env.CACHE_CURRENT_COUNT = String(currentCount);
  }
  const currentDocCount = await CacheEntry.countDocuments({});
  process.env.CACHE_CURRENT_COUNT = String(currentDocCount);

  console.log({ currentDocCount });
};

export const deleteOneEntry = async () => {
  //function responsible for removing least important entry to freeup cache


  //Approach A remove least recent updated item
  const items:CacheEntryType[] = await CacheEntry.find({}, null, {
    sort: { updatedAt: 1 },
    limit: 1,
  });
  
  await CacheEntry.findByIdAndDelete(items?.[0]._id)
};

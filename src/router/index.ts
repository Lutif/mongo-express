import {Router} from "express";
import {getCacheEntry} from "./getCacheEntry"
import {getCacheEntries} from "./getCacheEntries"
import {createOrUpdateCacheEntries } from "./createOrUpateEntries";
import {removeAllEntries} from "./removeAllEntries"

const router = Router()

router.get("/cache/:key", getCacheEntry)
router.get("/cache", getCacheEntries)
router.put("/hello", createOrUpdateCacheEntries)
router.delete("/hello", removeAllEntries)

export {router}
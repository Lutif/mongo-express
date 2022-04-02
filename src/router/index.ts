import {Router} from "express";
import {getCacheEntry} from "./getCacheEntry"
import {getCacheKey} from "./getCacheKeys"
import {createOrUpdateCacheEntries } from "./createOrUpateEntries";
import {removeAllEntries} from "./removeAllEntries"

const router = Router()

router.get("/cache/:key", getCacheEntry)
router.get("/key", getCacheKey)
router.put("/cache/:key", createOrUpdateCacheEntries)
router.delete("/cache", removeAllEntries)

export {router}
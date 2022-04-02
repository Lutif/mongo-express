"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const getCacheEntry_1 = require("./getCacheEntry");
const getCacheEntries_1 = require("./getCacheEntries");
const createOrUpateEntries_1 = require("./createOrUpateEntries");
const removeAllEntries_1 = require("./removeAllEntries");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/cache/:key", getCacheEntry_1.getCacheEntry);
router.get("/cache", getCacheEntries_1.getCacheEntries);
router.put("/hello", createOrUpateEntries_1.createOrUpdateCacheEntries);
router.delete("/hello", removeAllEntries_1.removeAllEntries);
//# sourceMappingURL=index.js.map
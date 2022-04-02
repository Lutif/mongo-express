"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOneEntry = exports.updateCurrentCount = exports.ttlExpired = exports.genHexString = void 0;
const constants_1 = require("./constants");
const db_1 = require("../db");
const genHexString = (len) => {
    const hex = "0123456789ABCDEF";
    let output = "";
    for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
};
exports.genHexString = genHexString;
const ttlExpired = (lastUpdateAt) => {
    const ttl = process.env.TTL || constants_1.defaultTTL;
    const now = new Date().getTime();
    const lastUpdated = new Date(lastUpdateAt).getTime();
    return now - lastUpdated > ttl;
};
exports.ttlExpired = ttlExpired;
const updateCurrentCount = (currentCount) => __awaiter(void 0, void 0, void 0, function* () {
    if (currentCount) {
        process.env.CACHE_CURRENT_COUNT = String(currentCount);
    }
    const currentDocCount = yield db_1.CacheEntry.countDocuments({});
    process.env.CACHE_CURRENT_COUNT = String(currentDocCount);
    console.log({ currentDocCount });
});
exports.updateCurrentCount = updateCurrentCount;
const deleteOneEntry = () => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield db_1.CacheEntry.find({}, null, {
        sort: { updatedAt: 1 },
        limit: 1,
    });
    yield db_1.CacheEntry.findByIdAndDelete(items === null || items === void 0 ? void 0 : items[0]._id);
});
exports.deleteOneEntry = deleteOneEntry;
//# sourceMappingURL=helper.js.map
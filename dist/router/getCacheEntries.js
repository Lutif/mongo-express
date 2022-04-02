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
exports.getCacheKey = void 0;
const db_1 = require("../db");
const getCacheKey = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cacheEntries = yield db_1.CacheEntry.find().lean();
        res.json(JSON.stringify(cacheEntries.map(item => item._id)));
    }
    catch (error) {
        console.log(error);
        res.send("hello");
    }
});
exports.getCacheKey = getCacheKey;
//# sourceMappingURL=getCacheEntries.js.map
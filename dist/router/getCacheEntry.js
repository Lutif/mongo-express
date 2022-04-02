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
exports.getCacheEntry = void 0;
const db_1 = require("../db");
const http_errors_1 = require("http-errors");
const utils_1 = require("../utils");
const getCacheEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { key } = req.params;
        if (!key)
            throw new http_errors_1.BadRequest("Missing key input");
        let entry;
        entry = yield db_1.CacheEntry.findByIdAndUpdate(key, {}).lean();
        if (!entry) {
            console.log("Cache miss");
            if (Number(process.env.CACHE_CURRENT_COUNT) >=
                Number(process.env.CACHE_LIMIT)) {
                yield (0, utils_1.deleteOneEntry)();
            }
            entry = yield db_1.CacheEntry.create({ _id: key });
            yield (0, utils_1.updateCurrentCount)(Number(process.env.CACHE_CURRENT_COUNT) + 1);
        }
        else {
            console.log("Cache hit");
            if ((0, utils_1.ttlExpired)(entry.updatedAt)) {
                entry = yield db_1.CacheEntry.findByIdAndUpdate(key, {
                    data: (0, utils_1.genHexString)(22),
                }).lean();
            }
        }
        return res.send(entry.data);
    }
    catch (error) {
        console.log(error);
        return res.status(error.code || 500).send({
            message: error.message || "something went wrong",
        });
    }
});
exports.getCacheEntry = getCacheEntry;
//# sourceMappingURL=getCacheEntry.js.map
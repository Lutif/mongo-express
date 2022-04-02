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
exports.createOrUpdate = void 0;
const utils_1 = require("../utils");
const cacheModel_1 = require("./cacheModel");
const createOrUpdate = ({ key, data, }) => __awaiter(void 0, void 0, void 0, function* () {
    let entry;
    console.log({ key, data });
    entry = yield cacheModel_1.CacheEntry.findByIdAndUpdate(key, { data }).lean();
    if (!entry) {
        console.log("Cache miss");
        if (Number(process.env.CACHE_CURRENT_COUNT) >= Number(process.env.CACHE_LIMIT)) {
            yield (0, utils_1.deleteOneEntry)();
        }
        entry = yield cacheModel_1.CacheEntry.create({ _id: key, data });
        yield (0, utils_1.updateCurrentCount)(Number(process.env.CACHE_CURRENT_COUNT) + 1);
    }
    else {
        console.log("Cache hit");
    }
    return entry;
});
exports.createOrUpdate = createOrUpdate;
//# sourceMappingURL=createOrUpdate.js.map
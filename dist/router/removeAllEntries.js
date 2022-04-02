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
exports.removeAllEntries = void 0;
const utils_1 = require("../utils");
const db_1 = require("../db");
const removeAllEntries = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { deletedCount } = yield db_1.CacheEntry.deleteMany();
        yield (0, utils_1.updateCurrentCount)(Number(process.env.CACHE_CURRENT_COUNT) - (deletedCount || 0));
        return res.send(`deleted ${deletedCount} objects`);
    }
    catch (error) {
        console.log(error);
        return res.status(error.code || 500).send({
            message: error.message || "something went wrong",
        });
    }
});
exports.removeAllEntries = removeAllEntries;
//# sourceMappingURL=removeAllEntries.js.map
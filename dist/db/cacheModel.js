"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheEntry = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../utils");
const cacheSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        default: () => new mongoose_1.default.Types.ObjectId().toHexString(),
    },
    data: {
        type: String,
        default: () => (0, utils_1.genHexString)(22)
    },
    hitsForTTL: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.CacheEntry = mongoose_1.default.model("cache", cacheSchema);
//# sourceMappingURL=cacheModel.js.map
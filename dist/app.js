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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const router_1 = require("./router");
const body_parser_1 = __importDefault(require("body-parser"));
const utils_1 = require("./utils");
const PORT = process.env.PORT || 3000;
if (!process.env.CACHE_LIMIT)
    process.env.CACHE_LIMIT = utils_1.cacheLimit;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, db_1.connectdb)();
    yield (0, utils_1.updateCurrentCount)();
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.use(router_1.router);
    app.listen(PORT, () => {
        console.log(`Server is up and running on port: ${PORT}`);
    });
});
exports.main = main;
//# sourceMappingURL=app.js.map
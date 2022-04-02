"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttlExpired = exports.genHexString = void 0;
const constants_1 = require("./constants");
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
//# sourceMappingURL=helper.js.map
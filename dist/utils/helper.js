"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genHexString = void 0;
const genHexString = (len) => {
    const hex = '0123456789ABCDEF';
    let output = '';
    for (let i = 0; i < len; ++i) {
        output += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return output;
};
exports.genHexString = genHexString;
//# sourceMappingURL=helper.js.map
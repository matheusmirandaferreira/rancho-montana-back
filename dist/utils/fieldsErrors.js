"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldsErrors = void 0;
function fieldsErrors(keys, message) {
    const nullableKeys = Object.keys(keys);
    let errorsObj = {};
    nullableKeys.forEach((item) => {
        if (!keys[item]) {
            errorsObj[item] = message || `Este campo é obrigatório`;
        }
        if (keys[item] instanceof Array) {
            const arr = keys[item];
            if (arr.length === 0)
                errorsObj[item] = message || `Este campo é obrigatório`;
        }
    });
    return errorsObj;
}
exports.fieldsErrors = fieldsErrors;

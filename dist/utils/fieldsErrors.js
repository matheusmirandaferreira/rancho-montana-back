var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/fieldsErrors.ts
var fieldsErrors_exports = {};
__export(fieldsErrors_exports, {
  fieldsErrors: () => fieldsErrors
});
module.exports = __toCommonJS(fieldsErrors_exports);
function fieldsErrors(keys, message) {
  const nullableKeys = Object.keys(keys);
  let errorsObj = {};
  nullableKeys.forEach((item) => {
    if (!keys[item]) {
      errorsObj[item] = message || `Este campo \xE9 obrigat\xF3rio`;
    }
    if (keys[item] instanceof Array) {
      const arr = keys[item];
      if (arr.length === 0)
        errorsObj[item] = message || `Este campo \xE9 obrigat\xF3rio`;
    }
  });
  return errorsObj;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fieldsErrors
});

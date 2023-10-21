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

// src/utils/fileFilter.ts
var fileFilter_exports = {};
__export(fileFilter_exports, {
  fileFilter: () => fileFilter
});
module.exports = __toCommonJS(fileFilter_exports);
var fileFilter = (_, file, callback) => {
  const fileType = file.mimetype;
  const acceptedFiles = ["image/png", "image/jpg", "image/jpeg", "image/svg"];
  if (acceptedFiles.includes(fileType)) {
    callback(null, true);
  } else {
    callback(new Error(`O tipo ${fileType} n\xE3o \xE9 aceito`), false);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fileFilter
});

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/middleware/authMiddleware.ts
var authMiddleware_exports = {};
__export(authMiddleware_exports, {
  authMiddleware: () => authMiddleware
});
module.exports = __toCommonJS(authMiddleware_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({ error: "N\xE3o foi informado um token" });
  const parts = authHeader.split(" ");
  if (!(parts.length === 2))
    return res.status(401).send({ error: "Token inv\xE1lido" });
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token inv\xE1lido" });
  }
  import_jsonwebtoken.default.verify(token, process.env.SECRET, (err, decode) => {
    if (err)
      return res.status(400).send({ error: "Token inv\xE1lido" });
    return next();
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authMiddleware
});

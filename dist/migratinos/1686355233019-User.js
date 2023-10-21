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

// src/migratinos/1686355233019-User.ts
var User_exports = {};
__export(User_exports, {
  User1686355233019: () => User1686355233019
});
module.exports = __toCommonJS(User_exports);
var import_typeorm = require("typeorm");
var User1686355233019 = class {
  async up(queryRunner) {
    await queryRunner.createTable(
      new import_typeorm.Table({
        name: "user",
        columns: [
          {
            name: "uuiduser",
            type: "varchar",
            isPrimary: true
          },
          {
            name: "nmuser",
            type: "varchar"
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true
          },
          {
            name: "password",
            type: "varchar"
          },
          {
            name: "created_at",
            type: "timestamptz",
            default: "now()"
          },
          {
            name: "updated_at",
            type: "timestamptz",
            default: "now()"
          }
        ]
      })
    );
  }
  async down(queryRunner) {
    await queryRunner.dropTable("user");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  User1686355233019
});

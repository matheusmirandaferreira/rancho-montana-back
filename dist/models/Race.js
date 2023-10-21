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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/models/Race.ts
var Race_exports = {};
__export(Race_exports, {
  Race: () => Race
});
module.exports = __toCommonJS(Race_exports);
var import_typeorm5 = require("typeorm");

// src/models/Horse.ts
var import_typeorm4 = require("typeorm");

// src/models/Color.ts
var import_typeorm = require("typeorm");
var Color = class {
  uuidcolor;
  nmcolor;
  color_permalink;
  horses;
  created_at;
  updated_at;
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)("uuid")
], Color.prototype, "uuidcolor", 2);
__decorateClass([
  (0, import_typeorm.Column)({ unique: true })
], Color.prototype, "nmcolor", 2);
__decorateClass([
  (0, import_typeorm.Column)({ unique: true })
], Color.prototype, "color_permalink", 2);
__decorateClass([
  (0, import_typeorm.OneToMany)(() => Horse, (horse) => horse.color, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }),
  (0, import_typeorm.JoinColumn)({ name: "uuidhorse" })
], Color.prototype, "horses", 2);
__decorateClass([
  (0, import_typeorm.CreateDateColumn)({ type: "timestamptz", generated: true })
], Color.prototype, "created_at", 2);
__decorateClass([
  (0, import_typeorm.UpdateDateColumn)({ type: "timestamptz", generated: true })
], Color.prototype, "updated_at", 2);
Color = __decorateClass([
  (0, import_typeorm.Entity)()
], Color);

// src/models/Pace.ts
var import_typeorm2 = require("typeorm");
var Pace = class {
  uuidpace;
  nmpace;
  pace_permalink;
  horses;
  created_at;
  updated_at;
};
__decorateClass([
  (0, import_typeorm2.PrimaryGeneratedColumn)("uuid")
], Pace.prototype, "uuidpace", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ unique: true })
], Pace.prototype, "nmpace", 2);
__decorateClass([
  (0, import_typeorm2.Column)({ unique: true })
], Pace.prototype, "pace_permalink", 2);
__decorateClass([
  (0, import_typeorm2.OneToMany)(() => Horse, (horse) => horse.color, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }),
  (0, import_typeorm2.JoinColumn)({ name: "uuidhorse" })
], Pace.prototype, "horses", 2);
__decorateClass([
  (0, import_typeorm2.CreateDateColumn)({ type: "timestamptz", generated: true })
], Pace.prototype, "created_at", 2);
__decorateClass([
  (0, import_typeorm2.UpdateDateColumn)({ type: "timestamptz", generated: true })
], Pace.prototype, "updated_at", 2);
Pace = __decorateClass([
  (0, import_typeorm2.Entity)()
], Pace);

// src/models/Category.ts
var import_typeorm3 = require("typeorm");
var Category = class {
  uuidcategory;
  nmcategory;
  category_permalink;
  horses;
  created_at;
  updated_at;
};
__decorateClass([
  (0, import_typeorm3.PrimaryGeneratedColumn)("uuid")
], Category.prototype, "uuidcategory", 2);
__decorateClass([
  (0, import_typeorm3.Column)({ unique: true })
], Category.prototype, "nmcategory", 2);
__decorateClass([
  (0, import_typeorm3.Column)({ unique: true })
], Category.prototype, "category_permalink", 2);
__decorateClass([
  (0, import_typeorm3.OneToMany)(() => Horse, (horse) => horse.category, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }),
  (0, import_typeorm3.JoinColumn)({ name: "uuidhorse" })
], Category.prototype, "horses", 2);
__decorateClass([
  (0, import_typeorm3.CreateDateColumn)({ type: "timestamptz", generated: true })
], Category.prototype, "created_at", 2);
__decorateClass([
  (0, import_typeorm3.UpdateDateColumn)({ type: "timestamptz", generated: true })
], Category.prototype, "updated_at", 2);
Category = __decorateClass([
  (0, import_typeorm3.Entity)()
], Category);

// src/models/Horse.ts
var import_fs = require("fs");
var Horse = class {
  uuidhorse;
  nmhorse;
  description;
  uuidcategory;
  gender;
  category;
  birthdate;
  uuidrace;
  race;
  uuidcolor;
  color;
  uuidpace;
  pace;
  created_at;
  updated_at;
  toJSON() {
    return {
      ...this,
      uuidcolor: void 0,
      uuidpace: void 0,
      uuidrace: void 0,
      uuidcategory: void 0,
      image: (0, import_fs.readdirSync)("storage/public/").filter((fn) => fn.startsWith(this.uuidhorse)).map(
        (image) => `${process.env.APP_BASE_URL}/storage/public/${image}`
      )[0] || false
    };
  }
};
__decorateClass([
  (0, import_typeorm4.PrimaryGeneratedColumn)("uuid")
], Horse.prototype, "uuidhorse", 2);
__decorateClass([
  (0, import_typeorm4.Column)()
], Horse.prototype, "nmhorse", 2);
__decorateClass([
  (0, import_typeorm4.Column)()
], Horse.prototype, "description", 2);
__decorateClass([
  (0, import_typeorm4.Column)()
], Horse.prototype, "uuidcategory", 2);
__decorateClass([
  (0, import_typeorm4.Column)()
], Horse.prototype, "gender", 2);
__decorateClass([
  (0, import_typeorm4.ManyToOne)(() => Category),
  (0, import_typeorm4.JoinColumn)({ name: "uuidcategory" })
], Horse.prototype, "category", 2);
__decorateClass([
  (0, import_typeorm4.Column)({ type: "date" })
], Horse.prototype, "birthdate", 2);
__decorateClass([
  (0, import_typeorm4.Column)()
], Horse.prototype, "uuidrace", 2);
__decorateClass([
  (0, import_typeorm4.ManyToOne)(() => Race),
  (0, import_typeorm4.JoinColumn)({ name: "uuidrace" })
], Horse.prototype, "race", 2);
__decorateClass([
  (0, import_typeorm4.Column)()
], Horse.prototype, "uuidcolor", 2);
__decorateClass([
  (0, import_typeorm4.ManyToOne)(() => Color),
  (0, import_typeorm4.JoinColumn)({ name: "uuidcolor" })
], Horse.prototype, "color", 2);
__decorateClass([
  (0, import_typeorm4.Column)()
], Horse.prototype, "uuidpace", 2);
__decorateClass([
  (0, import_typeorm4.ManyToOne)(() => Pace),
  (0, import_typeorm4.JoinColumn)({ name: "uuidpace" })
], Horse.prototype, "pace", 2);
__decorateClass([
  (0, import_typeorm4.CreateDateColumn)({ type: "timestamptz", generated: true })
], Horse.prototype, "created_at", 2);
__decorateClass([
  (0, import_typeorm4.UpdateDateColumn)({ type: "timestamptz", generated: true })
], Horse.prototype, "updated_at", 2);
Horse = __decorateClass([
  (0, import_typeorm4.Entity)()
], Horse);

// src/models/Race.ts
var Race = class {
  uuidrace;
  nmrace;
  race_permalink;
  horses;
  created_at;
  updated_at;
};
__decorateClass([
  (0, import_typeorm5.PrimaryGeneratedColumn)("uuid")
], Race.prototype, "uuidrace", 2);
__decorateClass([
  (0, import_typeorm5.Column)({ unique: true })
], Race.prototype, "nmrace", 2);
__decorateClass([
  (0, import_typeorm5.Column)({ unique: true })
], Race.prototype, "race_permalink", 2);
__decorateClass([
  (0, import_typeorm5.OneToMany)(() => Horse, (horse) => horse.color, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }),
  (0, import_typeorm5.JoinColumn)({ name: "uuidhorse" })
], Race.prototype, "horses", 2);
__decorateClass([
  (0, import_typeorm5.CreateDateColumn)({ type: "timestamptz", generated: true })
], Race.prototype, "created_at", 2);
__decorateClass([
  (0, import_typeorm5.UpdateDateColumn)({ type: "timestamptz", generated: true })
], Race.prototype, "updated_at", 2);
Race = __decorateClass([
  (0, import_typeorm5.Entity)()
], Race);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Race
});

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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/repository/HorseRepository.ts
var HorseRepository_exports = {};
__export(HorseRepository_exports, {
  HorseRepository: () => HorseRepository
});
module.exports = __toCommonJS(HorseRepository_exports);
var import_uuid = require("uuid");

// src/data-source.ts
var import_reflect_metadata = require("reflect-metadata");
var import_typeorm8 = require("typeorm");

// src/models/User.ts
var import_typeorm = require("typeorm");
var import_bcryptjs = __toESM(require("bcryptjs"));
var User = class {
  uuiduser;
  nmuser;
  email;
  password;
  created_at;
  updated_at;
  async hashPassword() {
    const salt = await import_bcryptjs.default.genSalt(8);
    this.password = await import_bcryptjs.default.hash(this.password, salt);
  }
  toJSON() {
    return {
      ...this,
      password: void 0
    };
  }
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)("uuid")
], User.prototype, "uuiduser", 2);
__decorateClass([
  (0, import_typeorm.Column)()
], User.prototype, "nmuser", 2);
__decorateClass([
  (0, import_typeorm.Column)({ unique: true })
], User.prototype, "email", 2);
__decorateClass([
  (0, import_typeorm.Column)()
], User.prototype, "password", 2);
__decorateClass([
  (0, import_typeorm.CreateDateColumn)({ type: "timestamptz", generated: true })
], User.prototype, "created_at", 2);
__decorateClass([
  (0, import_typeorm.UpdateDateColumn)({ type: "timestamptz", generated: true })
], User.prototype, "updated_at", 2);
__decorateClass([
  (0, import_typeorm.BeforeInsert)()
], User.prototype, "hashPassword", 1);
User = __decorateClass([
  (0, import_typeorm.Entity)("user")
], User);

// src/migratinos/1686355233019-User.ts
var import_typeorm2 = require("typeorm");
var User1686355233019 = class {
  async up(queryRunner) {
    await queryRunner.createTable(
      new import_typeorm2.Table({
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

// src/models/Pace.ts
var import_typeorm7 = require("typeorm");

// src/models/Horse.ts
var import_typeorm6 = require("typeorm");

// src/models/Race.ts
var import_typeorm3 = require("typeorm");
var Race = class {
  uuidrace;
  nmrace;
  race_permalink;
  horses;
  created_at;
  updated_at;
};
__decorateClass([
  (0, import_typeorm3.PrimaryGeneratedColumn)("uuid")
], Race.prototype, "uuidrace", 2);
__decorateClass([
  (0, import_typeorm3.Column)({ unique: true })
], Race.prototype, "nmrace", 2);
__decorateClass([
  (0, import_typeorm3.Column)({ unique: true })
], Race.prototype, "race_permalink", 2);
__decorateClass([
  (0, import_typeorm3.OneToMany)(() => Horse, (horse) => horse.color, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }),
  (0, import_typeorm3.JoinColumn)({ name: "uuidhorse" })
], Race.prototype, "horses", 2);
__decorateClass([
  (0, import_typeorm3.CreateDateColumn)({ type: "timestamptz", generated: true })
], Race.prototype, "created_at", 2);
__decorateClass([
  (0, import_typeorm3.UpdateDateColumn)({ type: "timestamptz", generated: true })
], Race.prototype, "updated_at", 2);
Race = __decorateClass([
  (0, import_typeorm3.Entity)()
], Race);

// src/models/Color.ts
var import_typeorm4 = require("typeorm");
var Color = class {
  uuidcolor;
  nmcolor;
  color_permalink;
  horses;
  created_at;
  updated_at;
};
__decorateClass([
  (0, import_typeorm4.PrimaryGeneratedColumn)("uuid")
], Color.prototype, "uuidcolor", 2);
__decorateClass([
  (0, import_typeorm4.Column)({ unique: true })
], Color.prototype, "nmcolor", 2);
__decorateClass([
  (0, import_typeorm4.Column)({ unique: true })
], Color.prototype, "color_permalink", 2);
__decorateClass([
  (0, import_typeorm4.OneToMany)(() => Horse, (horse) => horse.color, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }),
  (0, import_typeorm4.JoinColumn)({ name: "uuidhorse" })
], Color.prototype, "horses", 2);
__decorateClass([
  (0, import_typeorm4.CreateDateColumn)({ type: "timestamptz", generated: true })
], Color.prototype, "created_at", 2);
__decorateClass([
  (0, import_typeorm4.UpdateDateColumn)({ type: "timestamptz", generated: true })
], Color.prototype, "updated_at", 2);
Color = __decorateClass([
  (0, import_typeorm4.Entity)()
], Color);

// src/models/Category.ts
var import_typeorm5 = require("typeorm");
var Category = class {
  uuidcategory;
  nmcategory;
  category_permalink;
  horses;
  created_at;
  updated_at;
};
__decorateClass([
  (0, import_typeorm5.PrimaryGeneratedColumn)("uuid")
], Category.prototype, "uuidcategory", 2);
__decorateClass([
  (0, import_typeorm5.Column)({ unique: true })
], Category.prototype, "nmcategory", 2);
__decorateClass([
  (0, import_typeorm5.Column)({ unique: true })
], Category.prototype, "category_permalink", 2);
__decorateClass([
  (0, import_typeorm5.OneToMany)(() => Horse, (horse) => horse.category, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }),
  (0, import_typeorm5.JoinColumn)({ name: "uuidhorse" })
], Category.prototype, "horses", 2);
__decorateClass([
  (0, import_typeorm5.CreateDateColumn)({ type: "timestamptz", generated: true })
], Category.prototype, "created_at", 2);
__decorateClass([
  (0, import_typeorm5.UpdateDateColumn)({ type: "timestamptz", generated: true })
], Category.prototype, "updated_at", 2);
Category = __decorateClass([
  (0, import_typeorm5.Entity)()
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
  (0, import_typeorm6.PrimaryGeneratedColumn)("uuid")
], Horse.prototype, "uuidhorse", 2);
__decorateClass([
  (0, import_typeorm6.Column)()
], Horse.prototype, "nmhorse", 2);
__decorateClass([
  (0, import_typeorm6.Column)()
], Horse.prototype, "description", 2);
__decorateClass([
  (0, import_typeorm6.Column)()
], Horse.prototype, "uuidcategory", 2);
__decorateClass([
  (0, import_typeorm6.Column)()
], Horse.prototype, "gender", 2);
__decorateClass([
  (0, import_typeorm6.ManyToOne)(() => Category),
  (0, import_typeorm6.JoinColumn)({ name: "uuidcategory" })
], Horse.prototype, "category", 2);
__decorateClass([
  (0, import_typeorm6.Column)({ type: "date" })
], Horse.prototype, "birthdate", 2);
__decorateClass([
  (0, import_typeorm6.Column)()
], Horse.prototype, "uuidrace", 2);
__decorateClass([
  (0, import_typeorm6.ManyToOne)(() => Race),
  (0, import_typeorm6.JoinColumn)({ name: "uuidrace" })
], Horse.prototype, "race", 2);
__decorateClass([
  (0, import_typeorm6.Column)()
], Horse.prototype, "uuidcolor", 2);
__decorateClass([
  (0, import_typeorm6.ManyToOne)(() => Color),
  (0, import_typeorm6.JoinColumn)({ name: "uuidcolor" })
], Horse.prototype, "color", 2);
__decorateClass([
  (0, import_typeorm6.Column)()
], Horse.prototype, "uuidpace", 2);
__decorateClass([
  (0, import_typeorm6.ManyToOne)(() => Pace),
  (0, import_typeorm6.JoinColumn)({ name: "uuidpace" })
], Horse.prototype, "pace", 2);
__decorateClass([
  (0, import_typeorm6.CreateDateColumn)({ type: "timestamptz", generated: true })
], Horse.prototype, "created_at", 2);
__decorateClass([
  (0, import_typeorm6.UpdateDateColumn)({ type: "timestamptz", generated: true })
], Horse.prototype, "updated_at", 2);
Horse = __decorateClass([
  (0, import_typeorm6.Entity)()
], Horse);

// src/models/Pace.ts
var Pace = class {
  uuidpace;
  nmpace;
  pace_permalink;
  horses;
  created_at;
  updated_at;
};
__decorateClass([
  (0, import_typeorm7.PrimaryGeneratedColumn)("uuid")
], Pace.prototype, "uuidpace", 2);
__decorateClass([
  (0, import_typeorm7.Column)({ unique: true })
], Pace.prototype, "nmpace", 2);
__decorateClass([
  (0, import_typeorm7.Column)({ unique: true })
], Pace.prototype, "pace_permalink", 2);
__decorateClass([
  (0, import_typeorm7.OneToMany)(() => Horse, (horse) => horse.color, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  }),
  (0, import_typeorm7.JoinColumn)({ name: "uuidhorse" })
], Pace.prototype, "horses", 2);
__decorateClass([
  (0, import_typeorm7.CreateDateColumn)({ type: "timestamptz", generated: true })
], Pace.prototype, "created_at", 2);
__decorateClass([
  (0, import_typeorm7.UpdateDateColumn)({ type: "timestamptz", generated: true })
], Pace.prototype, "updated_at", 2);
Pace = __decorateClass([
  (0, import_typeorm7.Entity)()
], Pace);

// src/data-source.ts
var options = {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [User, Pace, Race, Color, Category, Horse],
  migrations: [User1686355233019],
  migrationsTableName: process.env.DB_MIGRATION_TABLE_NAME,
  seeds: ["database/seeds/*{.ts,.js}"]
};
var AppDataSource = new import_typeorm8.DataSource(options);

// src/utils/fieldsErrors.ts
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

// src/repository/HorseRepository.ts
var import_multer = __toESM(require("multer"));

// src/utils/fileFilter.ts
var fileFilter = (_, file, callback) => {
  const fileType = file.mimetype;
  const acceptedFiles = ["image/png", "image/jpg", "image/jpeg", "image/svg"];
  if (acceptedFiles.includes(fileType)) {
    callback(null, true);
  } else {
    callback(new Error(`O tipo ${fileType} n\xE3o \xE9 aceito`), false);
  }
};

// src/repository/HorseRepository.ts
var import_fs2 = require("fs");
var repo = AppDataSource.getRepository(Horse);
var storage = import_multer.default.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "storage/public/");
  },
  filename: async (req, file, callback) => {
    try {
      const { uuid: uuidhorse } = req.params;
      if (!(0, import_uuid.validate)(uuidhorse))
        callback(new Error("Informe um uuid v\xE1lido"), "");
      const files = (0, import_fs2.readdirSync)("storage/public/").filter(
        (fn) => fn.startsWith(uuidhorse)
      );
      files.forEach((item) => {
        (0, import_fs2.unlink)("storage/public/" + item, (err) => {
          if (err)
            callback(new Error("Houve um erro ao adicionar a imagem"), "");
        });
      });
      const horse = await AppDataSource.createQueryBuilder(Horse, "horse").select().where("horse.uuidhorse = :uuidhorse", { uuidhorse }).getExists();
      if (!horse) {
        callback(new Error("Cavalo n\xE3o encontrado"), "");
      } else {
        callback(null, uuidhorse + "-" + file.originalname);
      }
    } catch (err) {
      callback(new Error("Houve um erro ao adicionar a imagem"), "");
    }
  }
});
var upload = (0, import_multer.default)({ storage, fileFilter }).single("image");
var HorseRepository = class {
  async uploadImage({ req, res, controller }) {
    upload(req, res, controller);
  }
  async getHorse({ uuidhorse }) {
    if (!(0, import_uuid.validate)(uuidhorse))
      return new Error("Informe um uuid v\xE1lido");
    const horse = await repo.find({
      relations: { color: true, pace: true, race: true, category: true },
      where: { uuidhorse }
    });
    if (!horse.length)
      return new Error("Cavalo n\xE3o encontrado");
    return Object({ status: "00", data: horse[0] });
  }
  async list() {
    const data = await repo.find({
      relations: { color: true, pace: true, race: true, category: true }
    });
    return Object({ status: "00", data });
  }
  async edit(props) {
    const {
      birthdate,
      uuidhorse,
      uuidcolor,
      uuidpace,
      uuidrace,
      nmhorse,
      description,
      uuidcategory,
      gender
    } = props;
    if (!(0, import_uuid.validate)(uuidhorse))
      return new Error("Informe um uuid v\xE1lido");
    const horse = await repo.findOneBy({ uuidhorse });
    if (!horse)
      return new Error("Cavalo n\xE3o encontrado");
    if (birthdate)
      horse.birthdate = new Date(
        birthdate.split("/").reverse().join("-")
      ).toISOString();
    const color = await AppDataSource.createQueryBuilder(Color, "color").select().where("color.uuidcolor = :uuidcolor", { uuidcolor }).getOne().catch(() => null);
    const pace = await AppDataSource.createQueryBuilder(Pace, "pace").select().where("pace.uuidpace = :uuidpace", { uuidpace }).getOne().catch(() => null);
    const race = await AppDataSource.createQueryBuilder(Race, "race").select().where("race.uuidrace = :uuidrace", { uuidrace }).getOne().catch(() => null);
    const category = await AppDataSource.createQueryBuilder(
      Category,
      "category"
    ).select().where("category.uuidcategory = :uuidcategory", { uuidcategory }).getOne().catch(() => null);
    if (!color || !race || !pace || !category)
      return new Error("Erro de valida\xE7\xE3o", {
        cause: fieldsErrors({ color, race, pace, category }, "UUID inv\xE1lido")
      });
    if (uuidcolor)
      horse.uuidcolor = uuidcolor;
    if (uuidpace)
      horse.uuidpace = uuidpace;
    if (uuidrace)
      horse.uuidrace = uuidrace;
    if (uuidcategory)
      horse.uuidcategory = uuidcategory;
    if (nmhorse)
      horse.nmhorse = nmhorse;
    if (gender)
      if (gender !== "M" && gender !== "F")
        return new Error("Erro de valida\xE7\xE3o", {
          cause: { gender: "O gen\xEAro deve ser 'M' ou 'F'" }
        });
      else
        horse.gender = gender;
    if (description)
      horse.description = description;
    await repo.save(horse);
    return Object({ status: "00", data: horse.toJSON() });
  }
  async delete({ uuidhorse }) {
    if (!uuidhorse)
      return new Error("Erro de valida\xE7\xE3o", {
        cause: fieldsErrors({ uuidhorse })
      });
    const horse = await repo.findOneBy({ uuidhorse });
    if (!horse)
      return new Error("Cavalo n\xE3o encontrado");
    await repo.remove(horse);
    return Object({ status: "00" });
  }
  async create(props) {
    const {
      birthdate,
      nmhorse,
      uuidcolor,
      uuidpace,
      uuidrace,
      description,
      gender,
      uuidcategory
    } = props;
    if (Object.values(props).some((i) => !i))
      return new Error("Preencha todos os campos", {
        cause: fieldsErrors(props)
      });
    const color = await AppDataSource.createQueryBuilder(Color, "color").select().where("color.uuidcolor = :uuidcolor", { uuidcolor }).getOne().catch(() => null);
    const pace = await AppDataSource.createQueryBuilder(Pace, "pace").select().where("pace.uuidpace = :uuidpace", { uuidpace }).getOne().catch(() => null);
    const race = await AppDataSource.createQueryBuilder(Race, "race").select().where("race.uuidrace = :uuidrace", { uuidrace }).getOne().catch(() => null);
    const category = await AppDataSource.createQueryBuilder(
      Category,
      "category"
    ).select().where("category.uuidcategory = :uuidcategory", { uuidcategory }).getOne().catch(() => null);
    if (!color || !race || !pace || !category)
      return new Error("Erro de valida\xE7\xE3o", {
        cause: fieldsErrors({ color, race, pace, category }, "UUID inv\xE1lido")
      });
    if (gender !== "M" && gender !== "F")
      return new Error("Erro de valida\xE7\xE3o", {
        cause: { gender: "O gen\xEAro deve ser 'M' ou 'F'" }
      });
    const horse = repo.create({
      birthdate: new Date(
        birthdate.split("/").reverse().join("-")
      ).toISOString(),
      nmhorse,
      uuidcolor,
      description,
      uuidpace,
      uuidrace,
      uuidcategory,
      gender
    });
    await repo.save(horse);
    return Object({ status: "00", data: horse });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HorseRepository
});
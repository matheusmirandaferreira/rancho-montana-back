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

// src/controllers/UserController.ts
var UserController_exports = {};
__export(UserController_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(UserController_exports);

// src/repository/UserRepository.ts
var import_bcryptjs2 = __toESM(require("bcryptjs"));
var import_uuid = require("uuid");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var emailValidator = __toESM(require("email-validator"));

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

// src/data-source.ts
var import_reflect_metadata = require("reflect-metadata");
var import_typeorm8 = require("typeorm");

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

// src/repository/UserRepository.ts
var repo = AppDataSource.getRepository(User);
var UserRepository = class {
  async getUser({ uuiduser }) {
    if (!(0, import_uuid.validate)(uuiduser))
      return new Error("Informe um uuid v\xE1lido");
    const user = await repo.findOneBy({ uuiduser });
    if (!user)
      return new Error("Usu\xE1rio n\xE3o encontrado");
    return Object({ status: "00", data: user });
  }
  async login({ email, password }) {
    if (!email || !password) {
      return new Error("Preencha todos os campos", {
        cause: fieldsErrors({ email, password })
      });
    }
    const user = await repo.findOneBy({ email });
    if (!user)
      return new Error("Usu\xE1rio ou senha inv\xE1lido!");
    if (!await import_bcryptjs2.default.compare(String(password), user.password))
      return new Error("Usu\xE1rio ou senha inv\xE1lido!");
    const token = import_jsonwebtoken.default.sign({ id: user.uuiduser }, process.env.SECRET, {
      expiresIn: "7d"
    });
    return Object({ status: "00", data: { ...user.toJSON(), token } });
  }
  async createUser({
    nmuser,
    email,
    password
  }) {
    if (!nmuser || !email || !password) {
      return new Error("Preencha todos os campos", {
        cause: fieldsErrors({ nmuser, email, password })
      });
    }
    if (!emailValidator.validate(email)) {
      return new Error("Preencha os campos corretamente", {
        cause: { email: "E-mail inv\xE1lido" }
      });
    }
    if ((await repo.findBy({ email })).length > 0) {
      return new Error("Usu\xE1rio j\xE1 existe");
    }
    password = String(password);
    const user = repo.create({ nmuser, email, password });
    await repo.save(user);
    return Object({ status: "00", data: user });
  }
  async getUsers() {
    const users = await repo.find();
    return Object({
      status: "00",
      data: users
    });
  }
  async editUser(props) {
    const { email, nmuser, newpassword, oldpassword, uuiduser } = props;
    if (!(0, import_uuid.validate)(uuiduser))
      return new Error("Informe um uuid v\xE1lido");
    const user = await repo.findOneBy({ uuiduser });
    if (!user)
      return new Error("Usu\xE1rio n\xE3o existe");
    if (nmuser)
      user.nmuser = nmuser;
    if (email)
      user.email = email;
    if (newpassword && oldpassword) {
      if (!await import_bcryptjs2.default.compare(String(oldpassword), user.password))
        return new Error("Erro de valida\xE7\xE3o", {
          cause: fieldsErrors({ oldpassword: "" }, "Senha atual \xE9 inv\xE1lida")
        });
      const salt = await import_bcryptjs2.default.genSalt(8);
      user.password = await import_bcryptjs2.default.hash(newpassword, salt);
    }
    if (newpassword && !oldpassword) {
      return new Error("Erro de valida\xE7\xE3o", {
        cause: fieldsErrors({ oldpassword })
      });
    }
    if (!newpassword && oldpassword) {
      return new Error("Erro de valida\xE7\xE3o", {
        cause: fieldsErrors({ newpassword })
      });
    }
    await repo.save(user);
    return Object({
      status: "00",
      data: { ...user.toJSON() }
    });
  }
};

// src/controllers/UserController.ts
var repo2 = new UserRepository();
var UserController = class {
  async getUser(req, res) {
    try {
      const { uuid: uuiduser } = req.params;
      const result = await repo2.getUser({ uuiduser });
      if (result instanceof Error)
        return res.status(400).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await repo2.login({ email, password });
      if (result instanceof Error)
        return res.status(400).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      console.log("Login ERR", err);
      return res.status(500).json({ message: err.message });
    }
  }
  async createUser(req, res) {
    try {
      const { nmuser, email, password } = req.body;
      const result = await repo2.createUser({
        nmuser,
        email,
        password
      });
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      console.log("err", err);
      return res.status(500).json({ message: "Houve um erro ao criar o usu\xE1rio" });
    }
  }
  async getUsers(req, res) {
    try {
      const result = await repo2.getUsers();
      if (result instanceof Error)
        return res.status(500).json({ message: "Houve um erro ao carregar seus dados" });
      return res.json(result);
    } catch (err) {
      console.log(err);
    }
  }
  async editUser(req, res) {
    try {
      const { uuid } = req.params;
      const { nmuser, email, newpassword, oldpassword } = req.body;
      const result = await repo2.editUser({
        uuiduser: uuid,
        email,
        nmuser,
        newpassword,
        oldpassword
      });
      if (result instanceof Error)
        return res.status(400).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json({ status: "00", user: result });
    } catch (err) {
      console.log(err);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserController
});

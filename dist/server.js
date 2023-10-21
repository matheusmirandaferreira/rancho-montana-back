var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/server.ts
var import_cors = __toESM(require("cors"));
var import_express2 = __toESM(require("express"));

// src/routes/index.ts
var import_express = __toESM(require("express"));

// src/middleware/authMiddleware.ts
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

// src/repository/UserRepository.ts
var import_bcryptjs2 = __toESM(require("bcryptjs"));
var import_uuid = require("uuid");
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
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
    const token = import_jsonwebtoken2.default.sign({ id: user.uuiduser }, process.env.SECRET, {
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

// src/repository/PaceRepository.ts
var import_uuid2 = require("uuid");
var import_normalize_text = require("normalize-text");
var repo3 = AppDataSource.getRepository(Pace);
var PaceRepository = class {
  async getPace({ uuidpace }) {
    if (!(0, import_uuid2.validate)(uuidpace))
      return new Error("Informe um uuid v\xE1lido");
    const pace = await repo3.findOneBy({ uuidpace });
    if (!pace)
      return new Error("Andamento n\xE3o encontrado");
    return Object({ status: "00", data: pace });
  }
  async create(props) {
    let { nmpace } = props;
    nmpace = (0, import_normalize_text.normalizeWhiteSpaces)(nmpace);
    if (!nmpace)
      return new Error("Informe um nome v\xE1lido", {
        cause: fieldsErrors({ nmpace })
      });
    if (await repo3.findOneBy({ nmpace }))
      return new Error("Andamento j\xE1 cadastrado!");
    const permalink = (0, import_normalize_text.normalizeDiacritics)(nmpace).toLowerCase().replaceAll(" ", "_");
    if (await repo3.findOneBy({ pace_permalink: permalink }))
      return new Error("Andamento j\xE1 cadastrado!");
    const pace = repo3.create({ nmpace, pace_permalink: permalink });
    await repo3.save(pace);
    return Object({ status: "00", data: pace });
  }
  async list() {
    const paces = await repo3.find();
    return Object({ status: "00", data: paces });
  }
  async edit(props) {
    const { uuid: uuidpace, nmpace } = props;
    if (!uuidpace)
      return new Error("Informe um uuid v\xE1lido");
    if (!nmpace)
      return new Error("Erro de valida\xE7\xE3o", {
        cause: fieldsErrors({ nmpace })
      });
    const pace = await repo3.findOneBy({ uuidpace });
    if (!pace)
      return new Error("Andamento n\xE3o encontrado!");
    const permalink = (0, import_normalize_text.normalizeDiacritics)(nmpace).toLowerCase().replaceAll(" ", "_");
    if (await repo3.findOneBy({ pace_permalink: permalink }))
      return new Error("Andamento j\xE1 existe!");
    pace.nmpace = nmpace;
    pace.pace_permalink = permalink;
    await repo3.save(pace);
    return Object({ status: "00", data: pace });
  }
  async delete({ uuid: uuidpace }) {
    if (!uuidpace)
      return new Error("Informe um uuid v\xE1lido");
    const pace = await repo3.findOneBy({ uuidpace });
    if (!pace)
      return new Error("Andamento n\xE3o encontrado!");
    await repo3.remove(pace);
    return Object({ status: "00" });
  }
};

// src/controllers/PaceController.ts
var repo4 = new PaceRepository();
var PaceController = class {
  async getPace(req, res) {
    const { uuid: uuidpace } = req.params;
    const result = await repo4.getPace({ uuidpace });
    if (result instanceof Error)
      return res.status(422).json({ status: "01", message: result.message, errors: result.cause });
    return res.json(result);
  }
  async create(req, res) {
    try {
      const { nmpace } = req.body;
      const result = await repo4.create({ nmpace });
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async list(req, res) {
    try {
      const result = await repo4.list();
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async edit(req, res) {
    try {
      const { uuid } = req.params;
      const { nmpace } = req.body;
      const result = await repo4.edit({ uuid, nmpace });
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async delete(req, res) {
    try {
      const { uuid } = req.params;
      const result = await repo4.delete({ uuid });
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};

// src/repository/ColorRepository.ts
var import_uuid3 = require("uuid");
var import_normalize_text2 = require("normalize-text");
var repo5 = AppDataSource.getRepository(Color);
var ColorRepository = class {
  async getColor({ uuidcolor }) {
    if (!(0, import_uuid3.validate)(uuidcolor))
      return new Error("Informe um uuid v\xE1lido");
    const horse = await repo5.findOneBy({ uuidcolor });
    if (!horse)
      return new Error("Cor n\xE3o encontrado");
    return Object({ status: "00", data: horse });
  }
  async create(props) {
    let { nmcolor } = props;
    nmcolor = (0, import_normalize_text2.normalizeWhiteSpaces)(nmcolor);
    if (!nmcolor)
      return new Error("Informe um nome v\xE1lido", {
        cause: fieldsErrors({ nmcolor })
      });
    if (await repo5.findOneBy({ nmcolor }))
      return new Error("Cor j\xE1 cadastrada!");
    const permalink = (0, import_normalize_text2.normalizeDiacritics)(nmcolor).toLowerCase().replaceAll(" ", "_");
    if (await repo5.findOneBy({ color_permalink: permalink }))
      return new Error("Cor j\xE1 cadastrada!");
    const color = repo5.create({ nmcolor, color_permalink: permalink });
    await repo5.save(color);
    return Object({ status: "00", data: color });
  }
  async list() {
    const colors = await repo5.find();
    return Object({ status: "00", data: colors });
  }
  async edit(props) {
    const { uuid: uuidcolor, nmcolor } = props;
    if (!uuidcolor)
      return new Error("Informe um uuid v\xE1lido");
    if (!nmcolor)
      return new Error("Erro de valida\xE7\xE3o", {
        cause: fieldsErrors({ nmcolor })
      });
    const color = await repo5.findOneBy({ uuidcolor });
    if (!color)
      return new Error("Cor n\xE3o encontrada");
    const permalink = (0, import_normalize_text2.normalizeDiacritics)(nmcolor).toLowerCase().replaceAll(" ", "_");
    if (await repo5.findOneBy({ color_permalink: permalink }))
      return new Error("Cor j\xE1 existe!");
    color.nmcolor = nmcolor;
    color.color_permalink = permalink;
    await repo5.save(color);
    return Object({ status: "00", data: color });
  }
  async delete({ uuid: uuidcolor }) {
    if (!uuidcolor)
      return new Error("Informe um uuid v\xE1lido");
    const color = await repo5.findOneBy({ uuidcolor });
    if (!color)
      return new Error("Cor n\xE3o encontrada");
    await repo5.remove(color);
    return Object({ status: "00" });
  }
};

// src/controllers/ColorController.ts
var repo6 = new ColorRepository();
var ColorController = class {
  async getColor(req, res) {
    const { uuid: uuidcolor } = req.params;
    const result = await repo6.getColor({ uuidcolor });
    if (result instanceof Error)
      return res.status(422).json({ status: "01", message: result.message, errors: result.cause });
    return res.json(result);
  }
  async create(req, res) {
    try {
      const { nmcolor } = req.body;
      const result = await repo6.create({ nmcolor });
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async list(req, res) {
    try {
      const result = await repo6.list();
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async edit(req, res) {
    try {
      const { uuid } = req.params;
      const { nmcolor } = req.body;
      const result = await repo6.edit({ uuid, nmcolor });
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async delete(req, res) {
    try {
      const { uuid } = req.params;
      const result = await repo6.delete({ uuid });
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};

// src/repository/RaceRepository.ts
var import_uuid4 = require("uuid");
var import_normalize_text3 = require("normalize-text");
var repo7 = AppDataSource.getRepository(Race);
var RaceRepository = class {
  async getRace({ uuidrace }) {
    if (!(0, import_uuid4.validate)(uuidrace))
      return new Error("Informe um uuid v\xE1lido");
    const horse = await repo7.findOneBy({ uuidrace });
    if (!horse)
      return new Error("Ra\xE7a n\xE3o encontrado");
    return Object({ status: "00", data: horse });
  }
  async create(props) {
    let { nmrace } = props;
    nmrace = (0, import_normalize_text3.normalizeWhiteSpaces)(nmrace);
    if (!nmrace)
      return new Error("Informe um nome v\xE1lido", {
        cause: fieldsErrors({ nmrace })
      });
    if (await repo7.findOneBy({ nmrace }))
      return new Error("Ra\xE7a j\xE1 cadastrado!");
    const permalink = (0, import_normalize_text3.normalizeDiacritics)(nmrace).toLowerCase().replaceAll(" ", "_");
    if (await repo7.findOneBy({ race_permalink: permalink }))
      return new Error("Ra\xE7a j\xE1 cadastrada!");
    const race = repo7.create({ nmrace, race_permalink: permalink });
    await repo7.save(race);
    return Object({ status: "00", data: race });
  }
  async list() {
    const races = await repo7.find();
    return Object({ status: "00", data: races });
  }
  async edit(props) {
    const { uuid: uuidrace, nmrace } = props;
    if (!uuidrace)
      return new Error("Informe um uuid v\xE1lido");
    if (!nmrace)
      return new Error("Erro de valida\xE7\xE3o", {
        cause: fieldsErrors({ nmrace })
      });
    const race = await repo7.findOneBy({ uuidrace });
    if (!race)
      return new Error("Ra\xE7a n\xE3o encontrada!");
    const permalink = (0, import_normalize_text3.normalizeDiacritics)(nmrace).toLowerCase().replaceAll(" ", "_");
    if (await repo7.findOneBy({ race_permalink: permalink }))
      return new Error("Ra\xE7a j\xE1 existe!");
    race.nmrace = nmrace;
    race.race_permalink = permalink;
    await repo7.save(race);
    return Object({ status: "00", data: race });
  }
  async delete({ uuid: uuidrace }) {
    if (!uuidrace)
      return new Error("Informe um uuid v\xE1lido");
    const race = await repo7.findOneBy({ uuidrace });
    if (!race)
      return new Error("Ra\xE7a n\xE3o encontrada!");
    await repo7.remove(race);
    return Object({ status: "00" });
  }
};

// src/controllers/RaceController.ts
var repo8 = new RaceRepository();
var RaceController = class {
  async getRace(req, res) {
    const { uuid: uuidrace } = req.params;
    const result = await repo8.getRace({ uuidrace });
    if (result instanceof Error)
      return res.status(422).json({ status: "01", message: result.message, errors: result.cause });
    return res.json(result);
  }
  async create(req, res) {
    try {
      const { nmrace } = req.body;
      const result = await repo8.create({ nmrace });
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async list(req, res) {
    try {
      const result = await repo8.list();
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async edit(req, res) {
    try {
      const { uuid } = req.params;
      const { nmrace } = req.body;
      const result = await repo8.edit({ uuid, nmrace });
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
  async delete(req, res) {
    try {
      const { uuid } = req.params;
      const result = await repo8.delete({ uuid });
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};

// src/repository/HorseRepository.ts
var import_uuid5 = require("uuid");
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
var repo9 = AppDataSource.getRepository(Horse);
var storage = import_multer.default.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "storage/public/");
  },
  filename: async (req, file, callback) => {
    try {
      const { uuid: uuidhorse } = req.params;
      if (!(0, import_uuid5.validate)(uuidhorse))
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
    if (!(0, import_uuid5.validate)(uuidhorse))
      return new Error("Informe um uuid v\xE1lido");
    const horse = await repo9.find({
      relations: { color: true, pace: true, race: true, category: true },
      where: { uuidhorse }
    });
    if (!horse.length)
      return new Error("Cavalo n\xE3o encontrado");
    return Object({ status: "00", data: horse[0] });
  }
  async list() {
    const data = await repo9.find({
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
    if (!(0, import_uuid5.validate)(uuidhorse))
      return new Error("Informe um uuid v\xE1lido");
    const horse = await repo9.findOneBy({ uuidhorse });
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
    await repo9.save(horse);
    return Object({ status: "00", data: horse.toJSON() });
  }
  async delete({ uuidhorse }) {
    if (!uuidhorse)
      return new Error("Erro de valida\xE7\xE3o", {
        cause: fieldsErrors({ uuidhorse })
      });
    const horse = await repo9.findOneBy({ uuidhorse });
    if (!horse)
      return new Error("Cavalo n\xE3o encontrado");
    await repo9.remove(horse);
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
    const horse = repo9.create({
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
    await repo9.save(horse);
    return Object({ status: "00", data: horse });
  }
};

// src/controllers/HorseController.ts
var import_multer2 = __toESM(require("multer"));
var repo10 = new HorseRepository();
var HorseController = class {
  async uploadImage(req, res) {
    const controller = (err) => {
      console.log("err", err);
      if (err instanceof import_multer2.default.MulterError) {
        return res.status(422).json({ message: err.message });
      } else if (err) {
        return res.status(500).json({ message: err.message });
      } else {
        return res.json({ status: "00" });
      }
    };
    repo10.uploadImage({ req, res, controller });
  }
  async getHorse(req, res) {
    const { uuid: uuidhorse } = req.params;
    const result = await repo10.getHorse({ uuidhorse });
    if (result instanceof Error)
      return res.status(422).json({ status: "01", message: result.message, errors: result.cause });
    return res.json(result);
  }
  async list(req, res) {
    const result = await repo10.list();
    return res.json(result);
  }
  async edit(req, res) {
    try {
      const { uuid: uuidhorse } = req.params;
      const {
        birthdate,
        uuidcolor,
        uuidpace,
        uuidrace,
        nmhorse,
        description,
        uuidcategory,
        gender
      } = req.body;
      const result = await repo10.edit({
        uuidhorse,
        birthdate,
        uuidcolor,
        uuidpace,
        uuidrace,
        nmhorse,
        description,
        uuidcategory,
        gender
      });
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Houve um erro ao editar o cavalo" });
    }
  }
  async delete(req, res) {
    try {
      const { uuid: uuidhorse } = req.params;
      const result = await repo10.delete({ uuidhorse });
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Houve um erro ao deletar o cavalo" });
    }
  }
  async create(req, res) {
    try {
      const {
        birthdate,
        nmhorse,
        uuidcolor,
        uuidpace,
        uuidrace,
        uuidcategory,
        description,
        gender
      } = req.body;
      const result = await repo10.create({
        birthdate,
        nmhorse,
        uuidcolor,
        uuidpace,
        uuidrace,
        uuidcategory,
        description,
        gender
      });
      if (result instanceof Error)
        return res.status(422).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Houve um erro ao criar o cavalo" });
    }
  }
};

// src/repository/CategoryReposiroty.ts
var repo11 = AppDataSource.getRepository(Category);
var CategoryReposiroty = class {
  async list() {
    const data = await repo11.find();
    return Object({ status: "00", data });
  }
};

// src/controllers/CategoryController.ts
var repo12 = new CategoryReposiroty();
var CategoryController = class {
  async list(req, res) {
    try {
      const result = await repo12.list();
      if (result instanceof Error)
        return res.status(400).json({
          status: "01",
          message: result.message,
          errors: result.cause
        });
      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Houve um erro ao buscar as categorias." });
    }
  }
};

// src/routes/index.ts
var routes = (0, import_express.Router)();
routes.use(import_express.default.json());
routes.use("/storage/public", import_express.default.static("storage/public"));
routes.post("/api/auth", new UserController().login);
routes.post("/api/user", authMiddleware, new UserController().createUser);
routes.put("/api/user/:uuid", authMiddleware, new UserController().editUser);
routes.get("/api/user", authMiddleware, new UserController().getUsers);
routes.get("/api/user/:uuid", authMiddleware, new UserController().getUser);
routes.get("/api/pace", authMiddleware, new PaceController().list);
routes.get("/api/pace/:uuid", authMiddleware, new PaceController().getPace);
routes.post("/api/pace", authMiddleware, new PaceController().create);
routes.put("/api/pace/:uuid", authMiddleware, new PaceController().edit);
routes.delete("/api/pace/:uuid", authMiddleware, new PaceController().delete);
routes.get("/api/color", authMiddleware, new ColorController().list);
routes.get("/api/color/:uuid", authMiddleware, new ColorController().getColor);
routes.post("/api/color", authMiddleware, new ColorController().create);
routes.put("/api/color/:uuid", authMiddleware, new ColorController().edit);
routes.delete("/api/color/:uuid", authMiddleware, new ColorController().delete);
routes.get("/api/race", authMiddleware, new RaceController().list);
routes.get("/api/race/:uuid", authMiddleware, new RaceController().getRace);
routes.post("/api/race", authMiddleware, new RaceController().create);
routes.put("/api/race/:uuid", authMiddleware, new RaceController().edit);
routes.delete("/api/race/:uuid", authMiddleware, new RaceController().delete);
routes.get("/api/horse", new HorseController().list);
routes.get("/api/horse/:uuid", new HorseController().getHorse);
routes.post("/api/horse/:uuid/image", new HorseController().uploadImage);
routes.post("/api/horse", authMiddleware, new HorseController().create);
routes.put("/api/horse/:uuid", authMiddleware, new HorseController().edit);
routes.delete("/api/horse/:uuid", authMiddleware, new HorseController().delete);
routes.get("/api/category", authMiddleware, new CategoryController().list);
routes.get("/", (req, res) => res.send("BEM VINDO AO RANCHO MONTANA"));

// src/server.ts
var import_typeorm_extension = require("typeorm-extension");
var app = (0, import_express2.default)();
app.use((0, import_cors.default)());
app.use("/", routes);
var main = () => Promise.resolve(!AppDataSource.isInitialized && AppDataSource.initialize()).then(() => {
  console.log("Database started successfully");
  Promise.resolve((0, import_typeorm_extension.runSeeders)(AppDataSource)).catch(
    (err) => console.log("ERROR ON RUN SEEDER", err)
  );
}).catch((err) => console.log("Error on start database", err));
app.listen(process.env.APP_PORT, main);

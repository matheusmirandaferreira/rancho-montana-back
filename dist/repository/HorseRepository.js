"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorseRepository = void 0;
const uuid_1 = require("uuid");
const data_source_1 = require("../data-source");
const Color_1 = require("../models/Color");
const Horse_1 = require("../models/Horse");
const Pace_1 = require("../models/Pace");
const Race_1 = require("../models/Race");
const fieldsErrors_1 = require("../utils/fieldsErrors");
const Category_1 = require("../models/Category");
const multer_1 = __importDefault(require("multer"));
const fileFilter_1 = require("../utils/fileFilter");
const fs_1 = require("fs");
const repo = data_source_1.AppDataSource.getRepository(Horse_1.Horse);
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'storage/public/');
    },
    filename: (req, file, callback) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { uuid: uuidhorse } = req.params;
            if (!(0, uuid_1.validate)(uuidhorse))
                callback(new Error('Informe um uuid válido'), '');
            const files = (0, fs_1.readdirSync)('storage/public/').filter((fn) => fn.startsWith(uuidhorse));
            files.forEach((item) => {
                (0, fs_1.unlink)('storage/public/' + item, (err) => {
                    if (err)
                        callback(new Error('Houve um erro ao adicionar a imagem'), '');
                });
            });
            const horse = yield data_source_1.AppDataSource.createQueryBuilder(Horse_1.Horse, 'horse')
                .select()
                .where('horse.uuidhorse = :uuidhorse', { uuidhorse })
                .getExists();
            if (!horse) {
                callback(new Error('Cavalo não encontrado'), '');
            }
            else {
                callback(null, uuidhorse + '-' + file.originalname);
            }
        }
        catch (err) {
            callback(new Error('Houve um erro ao adicionar a imagem'), '');
        }
    }),
});
const upload = (0, multer_1.default)({ storage, fileFilter: fileFilter_1.fileFilter }).single('image');
class HorseRepository {
    uploadImage({ req, res, controller }) {
        return __awaiter(this, void 0, void 0, function* () {
            upload(req, res, controller);
        });
    }
    getHorse({ uuidhorse }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(uuidhorse))
                return new Error('Informe um uuid válido');
            const horse = yield repo.find({
                relations: { color: true, pace: true, race: true, category: true },
                where: { uuidhorse },
            });
            if (!horse.length)
                return new Error('Cavalo não encontrado');
            return Object({ status: '00', data: horse[0] });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield repo.find({
                relations: { color: true, pace: true, race: true, category: true },
            });
            return Object({ status: '00', data });
        });
    }
    edit(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { birthdate, uuidhorse, uuidcolor, uuidpace, uuidrace, nmhorse, description, uuidcategory, gender, } = props;
            if (!(0, uuid_1.validate)(uuidhorse))
                return new Error('Informe um uuid válido');
            const horse = yield repo.findOneBy({ uuidhorse });
            if (!horse)
                return new Error('Cavalo não encontrado');
            if (birthdate)
                horse.birthdate = new Date(birthdate.split('/').reverse().join('-')).toISOString();
            const color = yield data_source_1.AppDataSource.createQueryBuilder(Color_1.Color, 'color')
                .select()
                .where('color.uuidcolor = :uuidcolor', { uuidcolor })
                .getOne()
                .catch(() => null);
            const pace = yield data_source_1.AppDataSource.createQueryBuilder(Pace_1.Pace, 'pace')
                .select()
                .where('pace.uuidpace = :uuidpace', { uuidpace })
                .getOne()
                .catch(() => null);
            const race = yield data_source_1.AppDataSource.createQueryBuilder(Race_1.Race, 'race')
                .select()
                .where('race.uuidrace = :uuidrace', { uuidrace })
                .getOne()
                .catch(() => null);
            const category = yield data_source_1.AppDataSource.createQueryBuilder(Category_1.Category, 'category')
                .select()
                .where('category.uuidcategory = :uuidcategory', { uuidcategory })
                .getOne()
                .catch(() => null);
            if (!color || !race || !pace || !category)
                return new Error('Erro de validação', {
                    cause: (0, fieldsErrors_1.fieldsErrors)({ color, race, pace, category }, 'UUID inválido'),
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
                if (gender !== 'M' && gender !== 'F')
                    return new Error('Erro de validação', {
                        cause: { gender: "O genêro deve ser 'M' ou 'F'" },
                    });
                else
                    horse.gender = gender;
            if (description)
                horse.description = description;
            yield repo.save(horse);
            return Object({ status: '00', data: horse.toJSON() });
        });
    }
    delete({ uuidhorse }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uuidhorse)
                return new Error('Erro de validação', {
                    cause: (0, fieldsErrors_1.fieldsErrors)({ uuidhorse }),
                });
            const horse = yield repo.findOneBy({ uuidhorse });
            if (!horse)
                return new Error('Cavalo não encontrado');
            yield repo.remove(horse);
            return Object({ status: '00' });
        });
    }
    create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { birthdate, nmhorse, uuidcolor, uuidpace, uuidrace, description, gender, uuidcategory, } = props;
            if (Object.values(props).some((i) => !i))
                return new Error('Preencha todos os campos', {
                    cause: (0, fieldsErrors_1.fieldsErrors)(props),
                });
            const color = yield data_source_1.AppDataSource.createQueryBuilder(Color_1.Color, 'color')
                .select()
                .where('color.uuidcolor = :uuidcolor', { uuidcolor })
                .getOne()
                .catch(() => null);
            const pace = yield data_source_1.AppDataSource.createQueryBuilder(Pace_1.Pace, 'pace')
                .select()
                .where('pace.uuidpace = :uuidpace', { uuidpace })
                .getOne()
                .catch(() => null);
            const race = yield data_source_1.AppDataSource.createQueryBuilder(Race_1.Race, 'race')
                .select()
                .where('race.uuidrace = :uuidrace', { uuidrace })
                .getOne()
                .catch(() => null);
            const category = yield data_source_1.AppDataSource.createQueryBuilder(Category_1.Category, 'category')
                .select()
                .where('category.uuidcategory = :uuidcategory', { uuidcategory })
                .getOne()
                .catch(() => null);
            if (!color || !race || !pace || !category)
                return new Error('Erro de validação', {
                    cause: (0, fieldsErrors_1.fieldsErrors)({ color, race, pace, category }, 'UUID inválido'),
                });
            if (gender !== 'M' && gender !== 'F')
                return new Error('Erro de validação', {
                    cause: { gender: "O genêro deve ser 'M' ou 'F'" },
                });
            const horse = repo.create({
                birthdate: new Date(birthdate.split('/').reverse().join('-')).toISOString(),
                nmhorse,
                uuidcolor,
                description,
                uuidpace,
                uuidrace,
                uuidcategory,
                gender,
            });
            yield repo.save(horse);
            return Object({ status: '00', data: horse });
        });
    }
}
exports.HorseRepository = HorseRepository;

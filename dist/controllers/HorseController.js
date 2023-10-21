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
exports.HorseController = void 0;
const HorseRepository_1 = require("../repository/HorseRepository");
const multer_1 = __importDefault(require("multer"));
const repo = new HorseRepository_1.HorseRepository();
class HorseController {
    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const controller = (err) => {
                console.log('err', err);
                if (err instanceof multer_1.default.MulterError) {
                    return res.status(422).json({ message: err.message });
                }
                else if (err) {
                    return res.status(500).json({ message: err.message });
                }
                else {
                    return res.json({ status: '00' });
                }
            };
            repo.uploadImage({ req, res, controller });
        });
    }
    getHorse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid: uuidhorse } = req.params;
            const result = yield repo.getHorse({ uuidhorse });
            if (result instanceof Error)
                return res
                    .status(422)
                    .json({ status: '01', message: result.message, errors: result.cause });
            return res.json(result);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield repo.list();
            return res.json(result);
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uuid: uuidhorse } = req.params;
                const { birthdate, uuidcolor, uuidpace, uuidrace, nmhorse, description, uuidcategory, gender, } = req.body;
                const result = yield repo.edit({
                    uuidhorse,
                    birthdate,
                    uuidcolor,
                    uuidpace,
                    uuidrace,
                    nmhorse,
                    description,
                    uuidcategory,
                    gender,
                });
                if (result instanceof Error)
                    return res.status(422).json({
                        status: '01',
                        message: result.message,
                        errors: result.cause,
                    });
                return res.json(result);
            }
            catch (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ message: 'Houve um erro ao editar o cavalo' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uuid: uuidhorse } = req.params;
                const result = yield repo.delete({ uuidhorse });
                if (result instanceof Error)
                    return res.status(422).json({
                        status: '01',
                        message: result.message,
                        errors: result.cause,
                    });
                return res.json(result);
            }
            catch (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ message: 'Houve um erro ao deletar o cavalo' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { birthdate, nmhorse, uuidcolor, uuidpace, uuidrace, uuidcategory, description, gender, } = req.body;
                const result = yield repo.create({
                    birthdate,
                    nmhorse,
                    uuidcolor,
                    uuidpace,
                    uuidrace,
                    uuidcategory,
                    description,
                    gender,
                });
                if (result instanceof Error)
                    return res.status(422).json({
                        status: '01',
                        message: result.message,
                        errors: result.cause,
                    });
                return res.json(result);
            }
            catch (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ message: 'Houve um erro ao criar o cavalo' });
            }
        });
    }
}
exports.HorseController = HorseController;

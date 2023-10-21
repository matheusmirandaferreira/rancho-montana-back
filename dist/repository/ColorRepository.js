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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorRepository = void 0;
const uuid_1 = require("uuid");
const data_source_1 = require("../data-source");
const Color_1 = require("../models/Color");
const fieldsErrors_1 = require("../utils/fieldsErrors");
const normalize_text_1 = require("normalize-text");
const repo = data_source_1.AppDataSource.getRepository(Color_1.Color);
class ColorRepository {
    getColor({ uuidcolor }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(uuidcolor))
                return new Error('Informe um uuid válido');
            const horse = yield repo.findOneBy({ uuidcolor });
            if (!horse)
                return new Error('Cor não encontrado');
            return Object({ status: '00', data: horse });
        });
    }
    create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            let { nmcolor } = props;
            nmcolor = (0, normalize_text_1.normalizeWhiteSpaces)(nmcolor);
            if (!nmcolor)
                return new Error('Informe um nome válido', {
                    cause: (0, fieldsErrors_1.fieldsErrors)({ nmcolor }),
                });
            if (yield repo.findOneBy({ nmcolor }))
                return new Error('Cor já cadastrada!');
            const permalink = (0, normalize_text_1.normalizeDiacritics)(nmcolor)
                .toLowerCase()
                .replace(/ /g, '_');
            if (yield repo.findOneBy({ color_permalink: permalink }))
                return new Error('Cor já cadastrada!');
            const color = repo.create({ nmcolor, color_permalink: permalink });
            yield repo.save(color);
            return Object({ status: '00', data: color });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const colors = yield repo.find();
            return Object({ status: '00', data: colors });
        });
    }
    edit(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid: uuidcolor, nmcolor } = props;
            if (!uuidcolor)
                return new Error('Informe um uuid válido');
            if (!nmcolor)
                return new Error('Erro de validação', {
                    cause: (0, fieldsErrors_1.fieldsErrors)({ nmcolor }),
                });
            const color = yield repo.findOneBy({ uuidcolor });
            if (!color)
                return new Error('Cor não encontrada');
            const permalink = (0, normalize_text_1.normalizeDiacritics)(nmcolor)
                .toLowerCase()
                .replace(/ /g, '_');
            if (yield repo.findOneBy({ color_permalink: permalink }))
                return new Error('Cor já existe!');
            color.nmcolor = nmcolor;
            color.color_permalink = permalink;
            yield repo.save(color);
            return Object({ status: '00', data: color });
        });
    }
    delete({ uuid: uuidcolor }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uuidcolor)
                return new Error('Informe um uuid válido');
            const color = yield repo.findOneBy({ uuidcolor });
            if (!color)
                return new Error('Cor não encontrada');
            yield repo.remove(color);
            return Object({ status: '00' });
        });
    }
}
exports.ColorRepository = ColorRepository;

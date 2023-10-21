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
exports.RaceRepository = void 0;
const uuid_1 = require("uuid");
const data_source_1 = require("../data-source");
const Race_1 = require("../models/Race");
const fieldsErrors_1 = require("../utils/fieldsErrors");
const normalize_text_1 = require("normalize-text");
const repo = data_source_1.AppDataSource.getRepository(Race_1.Race);
class RaceRepository {
    getRace({ uuidrace }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(uuidrace))
                return new Error('Informe um uuid válido');
            const horse = yield repo.findOneBy({ uuidrace });
            if (!horse)
                return new Error('Raça não encontrado');
            return Object({ status: '00', data: horse });
        });
    }
    create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            let { nmrace } = props;
            nmrace = (0, normalize_text_1.normalizeWhiteSpaces)(nmrace);
            if (!nmrace)
                return new Error('Informe um nome válido', {
                    cause: (0, fieldsErrors_1.fieldsErrors)({ nmrace }),
                });
            if (yield repo.findOneBy({ nmrace }))
                return new Error('Raça já cadastrado!');
            const permalink = (0, normalize_text_1.normalizeDiacritics)(nmrace)
                .toLowerCase()
                .replace(/ /g, '_');
            if (yield repo.findOneBy({ race_permalink: permalink }))
                return new Error('Raça já cadastrada!');
            const race = repo.create({ nmrace, race_permalink: permalink });
            yield repo.save(race);
            return Object({ status: '00', data: race });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const races = yield repo.find();
            return Object({ status: '00', data: races });
        });
    }
    edit(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid: uuidrace, nmrace } = props;
            if (!uuidrace)
                return new Error('Informe um uuid válido');
            if (!nmrace)
                return new Error('Erro de validação', {
                    cause: (0, fieldsErrors_1.fieldsErrors)({ nmrace }),
                });
            const race = yield repo.findOneBy({ uuidrace });
            if (!race)
                return new Error('Raça não encontrada!');
            const permalink = (0, normalize_text_1.normalizeDiacritics)(nmrace)
                .toLowerCase()
                .replace(/ /g, '_');
            if (yield repo.findOneBy({ race_permalink: permalink }))
                return new Error('Raça já existe!');
            race.nmrace = nmrace;
            race.race_permalink = permalink;
            yield repo.save(race);
            return Object({ status: '00', data: race });
        });
    }
    delete({ uuid: uuidrace }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uuidrace)
                return new Error('Informe um uuid válido');
            const race = yield repo.findOneBy({ uuidrace });
            if (!race)
                return new Error('Raça não encontrada!');
            yield repo.remove(race);
            return Object({ status: '00' });
        });
    }
}
exports.RaceRepository = RaceRepository;

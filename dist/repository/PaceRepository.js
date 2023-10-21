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
exports.PaceRepository = void 0;
const uuid_1 = require("uuid");
const data_source_1 = require("../data-source");
const Pace_1 = require("../models/Pace");
const fieldsErrors_1 = require("../utils/fieldsErrors");
const normalize_text_1 = require("normalize-text");
const repo = data_source_1.AppDataSource.getRepository(Pace_1.Pace);
class PaceRepository {
    getPace({ uuidpace }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(uuidpace))
                return new Error('Informe um uuid válido');
            const pace = yield repo.findOneBy({ uuidpace });
            if (!pace)
                return new Error('Andamento não encontrado');
            return Object({ status: '00', data: pace });
        });
    }
    create(props) {
        return __awaiter(this, void 0, void 0, function* () {
            let { nmpace } = props;
            nmpace = (0, normalize_text_1.normalizeWhiteSpaces)(nmpace);
            if (!nmpace)
                return new Error('Informe um nome válido', {
                    cause: (0, fieldsErrors_1.fieldsErrors)({ nmpace }),
                });
            if (yield repo.findOneBy({ nmpace }))
                return new Error('Andamento já cadastrado!');
            const permalink = (0, normalize_text_1.normalizeDiacritics)(nmpace)
                .toLowerCase()
                .replace(/ /g, '_');
            if (yield repo.findOneBy({ pace_permalink: permalink }))
                return new Error('Andamento já cadastrado!');
            const pace = repo.create({ nmpace, pace_permalink: permalink });
            yield repo.save(pace);
            return Object({ status: '00', data: pace });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const paces = yield repo.find();
            return Object({ status: '00', data: paces });
        });
    }
    edit(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid: uuidpace, nmpace } = props;
            if (!uuidpace)
                return new Error('Informe um uuid válido');
            if (!nmpace)
                return new Error('Erro de validação', {
                    cause: (0, fieldsErrors_1.fieldsErrors)({ nmpace }),
                });
            const pace = yield repo.findOneBy({ uuidpace });
            if (!pace)
                return new Error('Andamento não encontrado!');
            const permalink = (0, normalize_text_1.normalizeDiacritics)(nmpace)
                .toLowerCase()
                .replace(/ /g, '_');
            if (yield repo.findOneBy({ pace_permalink: permalink }))
                return new Error('Andamento já existe!');
            pace.nmpace = nmpace;
            pace.pace_permalink = permalink;
            yield repo.save(pace);
            return Object({ status: '00', data: pace });
        });
    }
    delete({ uuid: uuidpace }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uuidpace)
                return new Error('Informe um uuid válido');
            const pace = yield repo.findOneBy({ uuidpace });
            if (!pace)
                return new Error('Andamento não encontrado!');
            yield repo.remove(pace);
            return Object({ status: '00' });
        });
    }
}
exports.PaceRepository = PaceRepository;

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
exports.RaceController = void 0;
const RaceRepository_1 = require("../repository/RaceRepository");
const repo = new RaceRepository_1.RaceRepository();
class RaceController {
    getRace(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid: uuidrace } = req.params;
            const result = yield repo.getRace({ uuidrace });
            if (result instanceof Error)
                return res
                    .status(422)
                    .json({ status: '01', message: result.message, errors: result.cause });
            return res.json(result);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nmrace } = req.body;
                const result = yield repo.create({ nmrace });
                if (result instanceof Error)
                    return res.status(422).json({
                        status: '01',
                        message: result.message,
                        errors: result.cause,
                    });
                return res.json(result);
            }
            catch (err) {
                return res.status(500).json({ message: err.message });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield repo.list();
                if (result instanceof Error)
                    return res.status(422).json({
                        status: '01',
                        message: result.message,
                        errors: result.cause,
                    });
                return res.json(result);
            }
            catch (err) {
                return res.status(500).json({ message: err.message });
            }
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uuid } = req.params;
                const { nmrace } = req.body;
                const result = yield repo.edit({ uuid, nmrace });
                if (result instanceof Error)
                    return res.status(422).json({
                        status: '01',
                        message: result.message,
                        errors: result.cause,
                    });
                return res.json(result);
            }
            catch (err) {
                return res.status(500).json({ message: err.message });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uuid } = req.params;
                const result = yield repo.delete({ uuid });
                if (result instanceof Error)
                    return res.status(422).json({
                        status: '01',
                        message: result.message,
                        errors: result.cause,
                    });
                return res.json(result);
            }
            catch (err) {
                return res.status(500).json({ message: err.message });
            }
        });
    }
}
exports.RaceController = RaceController;

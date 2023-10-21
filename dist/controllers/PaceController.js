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
exports.PaceController = void 0;
const PaceRepository_1 = require("../repository/PaceRepository");
const repo = new PaceRepository_1.PaceRepository();
class PaceController {
    getPace(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid: uuidpace } = req.params;
            const result = yield repo.getPace({ uuidpace });
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
                const { nmpace } = req.body;
                const result = yield repo.create({ nmpace });
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
                const { nmpace } = req.body;
                const result = yield repo.edit({ uuid, nmpace });
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
exports.PaceController = PaceController;

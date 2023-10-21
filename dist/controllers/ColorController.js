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
exports.ColorController = void 0;
const ColorRepository_1 = require("../repository/ColorRepository");
const repo = new ColorRepository_1.ColorRepository();
class ColorController {
    getColor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { uuid: uuidcolor } = req.params;
            const result = yield repo.getColor({ uuidcolor });
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
                const { nmcolor } = req.body;
                const result = yield repo.create({ nmcolor });
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
                const { nmcolor } = req.body;
                const result = yield repo.edit({ uuid, nmcolor });
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
exports.ColorController = ColorController;

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
exports.UserController = void 0;
const UserRepository_1 = require("../repository/UserRepository");
const repo = new UserRepository_1.UserRepository();
class UserController {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uuid: uuiduser } = req.params;
                const result = yield repo.getUser({ uuiduser });
                if (result instanceof Error)
                    return res.status(400).json({
                        status: '01',
                        message: result.message,
                        errors: result.cause,
                    });
                return res.json(result);
            }
            catch (err) {
                console.log(err);
                return res.status(500).json({ message: err.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield repo.login({ email, password });
                if (result instanceof Error)
                    return res.status(400).json({
                        status: '01',
                        message: result.message,
                        errors: result.cause,
                    });
                return res.json(result);
            }
            catch (err) {
                console.log('Login ERR', err);
                return res.status(500).json({ message: err.message });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nmuser, email, password } = req.body;
                const result = yield repo.createUser({
                    nmuser,
                    email,
                    password,
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
                console.log('err', err);
                return res
                    .status(500)
                    .json({ message: 'Houve um erro ao criar o usuário' });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield repo.getUsers();
                if (result instanceof Error)
                    return res
                        .status(500)
                        .json({ message: 'Houve um erro ao carregar seus dados' });
                return res.json(result);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uuid } = req.params;
                const { nmuser, email, newpassword, oldpassword } = req.body;
                const result = yield repo.editUser({
                    uuiduser: uuid,
                    email,
                    nmuser,
                    newpassword,
                    oldpassword,
                });
                if (result instanceof Error)
                    return res.status(400).json({
                        status: '01',
                        message: result.message,
                        errors: result.cause,
                    });
                return res.json({ status: '00', user: result });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.UserController = UserController;

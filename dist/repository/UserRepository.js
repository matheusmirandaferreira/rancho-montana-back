"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserRepository = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailValidator = __importStar(require("email-validator"));
const User_1 = require("../models/User");
const data_source_1 = require("../data-source");
const fieldsErrors_1 = require("../utils/fieldsErrors");
const repo = data_source_1.AppDataSource.getRepository(User_1.User);
class UserRepository {
    getUser({ uuiduser }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, uuid_1.validate)(uuiduser))
                return new Error('Informe um uuid válido');
            const user = yield repo.findOneBy({ uuiduser });
            if (!user)
                return new Error('Usuário não encontrado');
            return Object({ status: '00', data: user });
        });
    }
    login({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password) {
                return new Error('Preencha todos os campos', {
                    cause: (0, fieldsErrors_1.fieldsErrors)({ email, password }),
                });
            }
            const user = yield repo.findOneBy({ email });
            if (!user)
                return new Error('Usuário ou senha inválido!');
            if (!(yield bcryptjs_1.default.compare(String(password), user.password)))
                return new Error('Usuário ou senha inválido!');
            const token = jsonwebtoken_1.default.sign({ id: user.uuiduser }, process.env.SECRET, {
                expiresIn: '7d',
            });
            return Object({ status: '00', data: Object.assign(Object.assign({}, user.toJSON()), { token }) });
        });
    }
    createUser({ nmuser, email, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!nmuser || !email || !password) {
                return new Error('Preencha todos os campos', {
                    cause: (0, fieldsErrors_1.fieldsErrors)({ nmuser, email, password }),
                });
            }
            if (!emailValidator.validate(email)) {
                return new Error('Preencha os campos corretamente', {
                    cause: { email: 'E-mail inválido' },
                });
            }
            if ((yield repo.findBy({ email })).length > 0) {
                return new Error('Usuário já existe');
            }
            password = String(password);
            const user = repo.create({ nmuser, email, password });
            yield repo.save(user);
            return Object({ status: '00', data: user });
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield repo.find();
            return Object({
                status: '00',
                data: users,
            });
        });
    }
    editUser(props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, nmuser, newpassword, oldpassword, uuiduser } = props;
            if (!(0, uuid_1.validate)(uuiduser))
                return new Error('Informe um uuid válido');
            const user = yield repo.findOneBy({ uuiduser });
            if (!user)
                return new Error('Usuário não existe');
            if (nmuser)
                user.nmuser = nmuser;
            if (email)
                user.email = email;
            if (newpassword && oldpassword) {
                if (!(yield bcryptjs_1.default.compare(String(oldpassword), user.password)))
                    return new Error('Erro de validação', {
                        cause: (0, fieldsErrors_1.fieldsErrors)({ oldpassword: '' }, 'Senha atual é inválida'),
                    });
                const salt = yield bcryptjs_1.default.genSalt(8);
                user.password = yield bcryptjs_1.default.hash(newpassword, salt);
            }
            if (newpassword && !oldpassword) {
                return new Error('Erro de validação', {
                    cause: (0, fieldsErrors_1.fieldsErrors)({ oldpassword }),
                });
            }
            if (!newpassword && oldpassword) {
                return new Error('Erro de validação', {
                    cause: (0, fieldsErrors_1.fieldsErrors)({ newpassword }),
                });
            }
            yield repo.save(user);
            return Object({
                status: '00',
                data: Object.assign({}, user.toJSON()),
            });
        });
    }
}
exports.UserRepository = UserRepository;

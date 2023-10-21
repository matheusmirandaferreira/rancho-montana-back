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
const User_1 = require("../../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
class UserSeeder {
    run(dataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = dataSource.getRepository(User_1.User);
            const uuiduser = (0, uuid_1.v4)();
            const nmuser = 'Matheus Miranda Ferreira';
            const email = 'matheusdemirandaferreira@gmail.com';
            const salt = yield bcryptjs_1.default.genSalt(8);
            const password = yield bcryptjs_1.default.hash('123456', salt);
            if (!(yield repository.exist()))
                yield repository.insert([
                    {
                        email,
                        nmuser,
                        uuiduser,
                        password,
                    },
                ]);
        });
    }
}
exports.default = UserSeeder;

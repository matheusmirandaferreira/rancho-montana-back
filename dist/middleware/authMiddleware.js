"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send({ error: 'Não foi informado um token' });
    const parts = authHeader.split(' ');
    if (!(parts.length === 2))
        return res.status(401).send({ error: 'Token inválido' });
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token inválido' });
    }
    jsonwebtoken_1.default.verify(token, process.env.SECRET, (err, decode) => {
        if (err)
            return res.status(400).send({ error: 'Token inválido' });
        return next();
    });
};
exports.authMiddleware = authMiddleware;

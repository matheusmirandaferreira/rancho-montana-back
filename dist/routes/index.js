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
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importStar(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const UserController_1 = require("../controllers/UserController");
const PaceController_1 = require("../controllers/PaceController");
const ColorController_1 = require("../controllers/ColorController");
const RaceController_1 = require("../controllers/RaceController");
const HorseController_1 = require("../controllers/HorseController");
const CategoryController_1 = require("../controllers/CategoryController");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.use(express_1.default.json());
routes.use('/storage/public', express_1.default.static('storage/public'));
routes.post('/api/auth', new UserController_1.UserController().login);
routes.post('/api/user', authMiddleware_1.authMiddleware, new UserController_1.UserController().createUser);
routes.put('/api/user/:uuid', authMiddleware_1.authMiddleware, new UserController_1.UserController().editUser);
routes.get('/api/user', authMiddleware_1.authMiddleware, new UserController_1.UserController().getUsers);
routes.get('/api/user/:uuid', authMiddleware_1.authMiddleware, new UserController_1.UserController().getUser);
routes.get('/api/pace', authMiddleware_1.authMiddleware, new PaceController_1.PaceController().list);
routes.get('/api/pace/:uuid', authMiddleware_1.authMiddleware, new PaceController_1.PaceController().getPace);
routes.post('/api/pace', authMiddleware_1.authMiddleware, new PaceController_1.PaceController().create);
routes.put('/api/pace/:uuid', authMiddleware_1.authMiddleware, new PaceController_1.PaceController().edit);
routes.delete('/api/pace/:uuid', authMiddleware_1.authMiddleware, new PaceController_1.PaceController().delete);
routes.get('/api/color', authMiddleware_1.authMiddleware, new ColorController_1.ColorController().list);
routes.get('/api/color/:uuid', authMiddleware_1.authMiddleware, new ColorController_1.ColorController().getColor);
routes.post('/api/color', authMiddleware_1.authMiddleware, new ColorController_1.ColorController().create);
routes.put('/api/color/:uuid', authMiddleware_1.authMiddleware, new ColorController_1.ColorController().edit);
routes.delete('/api/color/:uuid', authMiddleware_1.authMiddleware, new ColorController_1.ColorController().delete);
routes.get('/api/race', authMiddleware_1.authMiddleware, new RaceController_1.RaceController().list);
routes.get('/api/race/:uuid', authMiddleware_1.authMiddleware, new RaceController_1.RaceController().getRace);
routes.post('/api/race', authMiddleware_1.authMiddleware, new RaceController_1.RaceController().create);
routes.put('/api/race/:uuid', authMiddleware_1.authMiddleware, new RaceController_1.RaceController().edit);
routes.delete('/api/race/:uuid', authMiddleware_1.authMiddleware, new RaceController_1.RaceController().delete);
routes.get('/api/horse', new HorseController_1.HorseController().list);
routes.get('/api/horse/:uuid', new HorseController_1.HorseController().getHorse);
routes.post('/api/horse/:uuid/image', new HorseController_1.HorseController().uploadImage);
routes.post('/api/horse', authMiddleware_1.authMiddleware, new HorseController_1.HorseController().create);
routes.put('/api/horse/:uuid', authMiddleware_1.authMiddleware, new HorseController_1.HorseController().edit);
routes.delete('/api/horse/:uuid', authMiddleware_1.authMiddleware, new HorseController_1.HorseController().delete);
routes.get('/api/category', authMiddleware_1.authMiddleware, new CategoryController_1.CategoryController().list);
// routes.post('/api/dash-images', authMiddleware,);
routes.get('/app', (req, res) => res.send('BEM VINDO AO RANCHO MONTANA'));

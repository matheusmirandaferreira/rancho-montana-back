"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const data_source_1 = require("./data-source");
const typeorm_extension_1 = require("typeorm-extension");
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/', routes_1.routes);
const options = {
    key: fs_1.default.readFileSync('./ranchomontana-brt.com.br.pem'),
    cert: fs_1.default.readFileSync('./ranchomontana-brt.com.br.pem'),
};
const server = https_1.default.createServer(options, app);
const main = () => Promise.resolve(!data_source_1.AppDataSource.isInitialized && data_source_1.AppDataSource.initialize())
    .then(() => {
    console.log('Database started successfully');
    Promise.resolve((0, typeorm_extension_1.runSeeders)(data_source_1.AppDataSource)).catch((err) => console.log('ERROR ON RUN SEEDER', err));
})
    .catch((err) => console.log('Error on start database', err));
app.listen(process.env.APP_PORT, main);
server.listen(process.env.APP_PORT, main);

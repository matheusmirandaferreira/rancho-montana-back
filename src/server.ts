import cors from 'cors';
import express from 'express';
import { routes } from './routes';
import { AppDataSource } from './data-source';
import { runSeeders } from 'typeorm-extension';
import https from 'https';
import fs from 'fs';

const app = express();

app.use(cors());
app.use('/', routes);

const options = {
  key: fs.readFileSync('./ranchomontana-brt.com.br.pem'),
  cert: fs.readFileSync('./ranchomontana-brt.com.br.pem'),
};

const server = https.createServer(options, app);

const main = () =>
  Promise.resolve(!AppDataSource.isInitialized && AppDataSource.initialize())
    .then(() => {
      console.log('Database started successfully');
      Promise.resolve(runSeeders(AppDataSource)).catch((err) =>
        console.log('ERROR ON RUN SEEDER', err)
      );
    })
    .catch((err) => console.log('Error on start database', err));

server.listen(process.env.APP_PORT, main);

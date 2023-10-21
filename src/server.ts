import cors from 'cors';
import express from 'express';
import { routes } from './routes';
import { AppDataSource } from './data-source';
import { runSeeders } from 'typeorm-extension';

const app = express();

app.use(cors());
app.use('/', routes);

const main = () =>
  Promise.resolve(!AppDataSource.isInitialized && AppDataSource.initialize())
    .then(() => {
      console.log('Database started successfully');
      Promise.resolve(runSeeders(AppDataSource)).catch((err) =>
        console.log('ERROR ON RUN SEEDER', err)
      );
    })
    .catch((err) => console.log('Error on start database', err));

app.listen(process.env.APP_PORT, main);

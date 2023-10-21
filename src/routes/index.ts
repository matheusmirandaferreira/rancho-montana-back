import express, { Router } from 'express';

import { authMiddleware } from '../middleware/authMiddleware';
import { UserController } from '../controllers/UserController';
import { PaceController } from '../controllers/PaceController';
import { ColorController } from '../controllers/ColorController';
import { RaceController } from '../controllers/RaceController';
import { HorseController } from '../controllers/HorseController';
import { CategoryController } from '../controllers/CategoryController';

const routes = Router();

routes.use(express.json());

routes.use('/storage/public', express.static('storage/public'));

routes.post('/api/auth', new UserController().login);

routes.post('/api/user', authMiddleware, new UserController().createUser);

routes.put('/api/user/:uuid', authMiddleware, new UserController().editUser);

routes.get('/api/user', authMiddleware, new UserController().getUsers);
routes.get('/api/user/:uuid', authMiddleware, new UserController().getUser);

routes.get('/api/pace', authMiddleware, new PaceController().list);
routes.get('/api/pace/:uuid', authMiddleware, new PaceController().getPace);
routes.post('/api/pace', authMiddleware, new PaceController().create);
routes.put('/api/pace/:uuid', authMiddleware, new PaceController().edit);
routes.delete('/api/pace/:uuid', authMiddleware, new PaceController().delete);

routes.get('/api/color', authMiddleware, new ColorController().list);
routes.get('/api/color/:uuid', authMiddleware, new ColorController().getColor);
routes.post('/api/color', authMiddleware, new ColorController().create);
routes.put('/api/color/:uuid', authMiddleware, new ColorController().edit);
routes.delete('/api/color/:uuid', authMiddleware, new ColorController().delete);

routes.get('/api/race', authMiddleware, new RaceController().list);
routes.get('/api/race/:uuid', authMiddleware, new RaceController().getRace);
routes.post('/api/race', authMiddleware, new RaceController().create);
routes.put('/api/race/:uuid', authMiddleware, new RaceController().edit);
routes.delete('/api/race/:uuid', authMiddleware, new RaceController().delete);

routes.get('/api/horse', new HorseController().list);
routes.get('/api/horse/:uuid', new HorseController().getHorse);
routes.post('/api/horse/:uuid/image', new HorseController().uploadImage);
routes.post('/api/horse', authMiddleware, new HorseController().create);
routes.put('/api/horse/:uuid', authMiddleware, new HorseController().edit);
routes.delete('/api/horse/:uuid', authMiddleware, new HorseController().delete);

routes.get('/api/category', authMiddleware, new CategoryController().list);

// routes.post('/api/dash-images', authMiddleware,);

routes.get('/', (req, res) => res.send('BEM VINDO AO RANCHO MONTANA'));

export { routes };

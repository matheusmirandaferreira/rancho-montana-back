import express, { Router } from 'express';

import { authMiddleware } from '../middleware/authMiddleware';
import { UserController } from '../controllers/UserController';
import { PaceController } from '../controllers/PaceController';
import { ColorController } from '../controllers/ColorController';
import { RaceController } from '../controllers/RaceController';
import { HorseController } from '../controllers/HorseController';

const routes = Router();

routes.use(express.json());
routes.use('/storage/public', express.static('storage/public'));

routes.post('/api/auth', new UserController().login);

routes.post(
  '/api/user/create',
  authMiddleware,
  new UserController().createUser
);

routes.put(
  '/api/user/:uuid/edit',
  authMiddleware,
  new UserController().editUser
);

routes.get('/api/user', authMiddleware, new UserController().getUsers);

routes.post('/api/pace/create', authMiddleware, new PaceController().create);
routes.get('/api/pace', authMiddleware, new PaceController().list);
routes.put('/api/pace/:uuid/edit', authMiddleware, new PaceController().edit);
routes.delete('/api/pace/:uuid', authMiddleware, new PaceController().delete);

routes.post('/api/color/create', authMiddleware, new ColorController().create);
routes.get('/api/color', authMiddleware, new ColorController().list);
routes.put('/api/color/:uuid/edit', authMiddleware, new ColorController().edit);
routes.delete('/api/color/:uuid', authMiddleware, new ColorController().delete);

routes.post('/api/race/create', authMiddleware, new RaceController().create);
routes.get('/api/race', authMiddleware, new RaceController().list);
routes.put('/api/race/:uuid/edit', authMiddleware, new RaceController().edit);
routes.delete('/api/race/:uuid', authMiddleware, new RaceController().delete);

routes.post('/api/horse/create', authMiddleware, new HorseController().create);
routes.get('/api/horse', authMiddleware, new HorseController().list);
routes.put('/api/horse/:uuid/edit', authMiddleware, new HorseController().edit);
routes.delete('/api/horse/:uuid', authMiddleware, new HorseController().delete);

export { routes };

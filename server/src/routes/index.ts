import { Router } from 'express';

import UsersController from '../app/controllers/UsersController';
import SessionsController from '../app/controllers/SessionsController';

const routes = Router();

routes.post('/users', UsersController.store);
routes.post('/sessions', SessionsController.store);

export default routes;

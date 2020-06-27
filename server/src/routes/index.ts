import { Router } from 'express';

import UsersController from '../app/controllers/UsersController';

const routes = Router();

routes.post('/users', UsersController.store);

export default routes;

import { Router } from 'express';

import ensureAuthentication from '../app/middlewares/ensureAuthentication';

import UsersController from '../app/controllers/UsersController';
import SessionsController from '../app/controllers/SessionsController';

const routes = Router();

routes.post('/users', UsersController.store);
routes.post('/sessions', SessionsController.store);

routes.use(ensureAuthentication);

export default routes;

import { Router } from 'express';

import ensureAuthentication from '../app/middlewares/ensureAuthentication';

import UsersController from '../app/controllers/UsersController';
import SessionsController from '../app/controllers/SessionsController';
import TasksController from '../app/controllers/TasksController';

const routes = Router();

routes.post('/users', UsersController.store);
routes.post('/sessions', SessionsController.store);

routes.use(ensureAuthentication);

routes.post('/tasks', TasksController.store);
routes.get('/tasks', TasksController.index);
routes.get('/tasks/:task_id', TasksController.show);
routes.put('/tasks/:task_id', TasksController.update);
routes.delete('/tasks/:task_id', TasksController.destroy);

export default routes;

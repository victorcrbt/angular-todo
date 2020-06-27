import { Request, Response } from 'express';

import CreateTaskService from '../services/CreateTaskService';
import ListUserTasksService from '../services/ListUserTasksService';
import UpdateTaskService from '../services/UpdateTaskService';

class TaskController {
  public async store(req: Request, res: Response): Promise<Response> {
    const createTask = new CreateTaskService();

    const task = await createTask.execute({
      user_id: req.user.id,
      description: 'test task',
      status: 'pending',
    });

    return res.status(201).json(task);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listUserTasks = new ListUserTasksService();

    const tasks = await listUserTasks.execute({
      user_id: req.user.id,
    });

    return res.status(200).json(tasks);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { task_id } = req.params;
    const { description } = req.body;

    const updateTask = new UpdateTaskService();

    const task = await updateTask.execute({
      user_id: req.user.id,
      task_id,
      description,
    });

    return res.status(200).json(task);
  }
}

export default new TaskController();

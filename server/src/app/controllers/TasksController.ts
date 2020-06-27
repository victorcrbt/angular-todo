import { Request, Response } from 'express';

import CreateTaskService from '../services/CreateTaskService';
import ListUserTasksService from '../services/ListUserTasksService';
import ShowTaskService from '../services/ShowTaskService';
import UpdateTaskService from '../services/UpdateTaskService';
import DeleteTaskService from '../services/DeleteTaskService';

class TaskController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { description } = req.body;

    const createTask = new CreateTaskService();

    const task = await createTask.execute({
      user_id: req.user.id,
      description,
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

  public async show(req: Request, res: Response): Promise<Response> {
    const { task_id } = req.params;

    const showTask = new ShowTaskService();

    const task = await showTask.execute({
      task_id,
      user_id: req.user.id,
    });

    return res.status(200).json(task);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { task_id } = req.params;
    const { description, status } = req.body;

    const updateTask = new UpdateTaskService();

    const task = await updateTask.execute({
      user_id: req.user.id,
      task_id,
      description,
      status,
    });

    return res.status(200).json(task);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { task_id } = req.params;

    const deleteTask = new DeleteTaskService();

    await deleteTask.execute({
      task_id,
      user_id: req.user.id,
    });

    return res.status(204).json();
  }
}

export default new TaskController();

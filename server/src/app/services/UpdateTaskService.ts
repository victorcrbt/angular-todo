import Task, { TaskType } from '../schemas/Task';
import User from '../schemas/User';

import AppError from '../../error/AppError';

interface IRequestDTO {
  user_id: string;
  task_id: string;
  description: string;
  status: 'pending' | 'completed';
}

export default class UpdateTaskService {
  public async execute({
    user_id,
    task_id,
    description,
    status,
  }: IRequestDTO): Promise<TaskType> {
    const user = await User.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const task = await Task.findById(task_id);

    if (!task) {
      throw new AppError('Task not found.', 404);
    }

    await task.update({
      description: description || task.description,
      status: status || task.status,
    });

    return task;
  }
}

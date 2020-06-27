import Task, { TaskType } from '../schemas/Task';
import AppError from '../../error/AppError';

interface IRequestDTO {
  user_id: string;
  task_id: string;
}

export default class ShowTaskService {
  public async execute({ user_id, task_id }: IRequestDTO): Promise<TaskType> {
    const task = await Task.findOne({
      _id: task_id,
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    if (task.user?.toString() !== user_id) {
      throw new AppError('You cannot view another user task.', 403);
    }

    return task;
  }
}

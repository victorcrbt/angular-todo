import Task, { TaskType } from '../schemas/Task';
import User from '../schemas/User';

import AppError from '../../error/AppError';

interface IRequestDTO {
  user_id: string;
  description: string;
  status: 'pending' | 'completed';
}

export default class CreateTaskService {
  public async execute({
    user_id,
    description,
    status,
  }: IRequestDTO): Promise<TaskType> {
    const user = await User.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const task = await Task.create({
      user: user!,
      description,
      status,
    });

    await user.update({
      $push: { tasks: task._id },
    });

    return task;
  }
}

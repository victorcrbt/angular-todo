import Task from '../schemas/Task';
import User from '../schemas/User';

import AppError from '../../error/AppError';

interface IRequestDTO {
  user_id: string;
  task_id: string;
}

export default class DeleteTaskService {
  public async execute({ user_id, task_id }: IRequestDTO): Promise<void> {
    const task = await Task.findOne({
      _id: task_id,
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    if (task.user?.toString() !== user_id) {
      throw new AppError('You cannot delete another user task.', 403);
    }

    const user = await User.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const taskIndex = user.tasks!.findIndex(
      (task) => task._id.toString() === task_id
    );

    user.tasks!.splice(taskIndex, 1);

    await user.save();

    await task.deleteOne();
  }
}

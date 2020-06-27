import Task, { TaskType } from '../schemas/Task';

interface IRequestDTO {
  user_id: string;
}

export default class ListUserTasksService {
  public async execute({ user_id }: IRequestDTO): Promise<TaskType[]> {
    console.log(user_id);

    const tasks = await Task.find({
      user: user_id,
    });

    return tasks;
  }
}

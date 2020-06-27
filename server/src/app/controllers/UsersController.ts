import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';

class UsersController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return res.status(201).json(user);
  }
}

export default new UsersController();

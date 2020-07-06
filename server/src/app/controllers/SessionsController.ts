import { Request, Response } from 'express';

import CreateSessionService from '../services/CreateSessionService';

class SessionsController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSession = new CreateSessionService();

    const session = await createSession.execute({
      email,
      password,
    });

    session.user.password = (undefined as unknown) as string;

    return res.status(201).json(session);
  }
}

export default new SessionsController();

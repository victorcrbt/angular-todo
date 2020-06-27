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

    delete session.user.password;

    return res.status(201).json(session);
  }
}

export default new SessionsController();

import { getMongoRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User from '../models/User';

import AppError from '../../error/AppError';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  token: string;
  user: User;
}

export default class CreateSessionService {
  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const usersRepository = getMongoRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid credentials.', 401);
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new AppError('Invalid credentials.', 401);
    }

    const token = jwt.sign({}, authConfig.jwt_secret, {
      subject: String(user.id),
      expiresIn: '1d',
    });

    return {
      token,
      user,
    };
  }
}

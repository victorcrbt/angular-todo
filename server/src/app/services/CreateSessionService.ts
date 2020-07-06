import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

import User, { UserType } from '../schemas/User';

import AppError from '../../error/AppError';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  token: string;
  user: UserType;
}

export default class CreateSessionService {
  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const user = await User.findOne({
      email,
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

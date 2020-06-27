import bcrypt from 'bcryptjs';

import User, { UserType } from '../schemas/User';
import AppError from '../../error/AppError';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: IRequestDTO): Promise<UserType> {
    const emailAlreadyUsed = await User.findOne({
      email,
    });

    if (emailAlreadyUsed) {
      throw new AppError('Email already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

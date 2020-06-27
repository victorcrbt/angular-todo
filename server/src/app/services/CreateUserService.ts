import { getMongoRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import User from '../models/User';
import AppError from '../../error/AppError';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const usersRepository = getMongoRepository(User);

    const emailAlreadyUsed = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (emailAlreadyUsed) {
      throw new AppError('Email already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

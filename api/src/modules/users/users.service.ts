import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

type CreateUserInput = {
  email: string;
  firstName: string;
  secondName?: string | null;
  passwordHash?: string | null;
  googleSub?: string | null;
  isEmailVerified?: boolean;
  verificationToken?: string | null;
  verificationExpires?: Date | null;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async create(input: CreateUserInput) {
    const user = this.usersRepo.create({
      email: input.email,
      firstName: input.firstName,
      secondName: input.secondName ?? null,
      passwordHash: input.passwordHash ?? null,
      googleSub: input.googleSub ?? null,
      isEmailVerified: input.isEmailVerified ?? false,
      verificationToken: input.verificationToken ?? null,
      verificationExpires: input.verificationExpires ?? null,
    });

    return this.usersRepo.save(user);
  }
}

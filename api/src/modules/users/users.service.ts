import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async getUserForLogin(email: string) {
    return this.usersRepo.findOne({
      where: { email },
      select: [
        'id',
        'email',
        'passwordHash',
        'role',
        'isEmailVerified',
        'firstName',
        'verificationToken',
      ],
    });
  }

  async getUserByVerificationToken(token: string) {
    return this.usersRepo.findOne({
      where: { verificationToken: token },
      select: ['id', 'verificationExpires', 'isEmailVerified'],
    });
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

  async update(id: string, attrs: Partial<User>): Promise<User> {
    // 1. Surandame vartotoją (patikriname, ar jis egzistuoja)
    const user = await this.usersRepo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // 2. Nukopijuojame naujas reikšmes į esamą objektą
    Object.assign(user, attrs);

    // 3. Išsaugojame (Tai suveiks ir su @BeforeUpdate() dekoratoriais,
    // nes išsaugojame visą esybę, o ne darome paprastą SQL UPDATE)
    return this.usersRepo.save(user);
  }

  async getAll() {
    return this.usersRepo.find();
  }
}

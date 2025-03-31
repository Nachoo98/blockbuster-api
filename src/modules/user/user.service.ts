import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: Partial<User>) {
    const user = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user);
    return instanceToPlain(savedUser);
  }

  async findAllUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => instanceToPlain(user));
  }

  async findUserByIdOrFail(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException();
    return instanceToPlain(user);
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
}

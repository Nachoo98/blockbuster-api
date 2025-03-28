import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { NotFoundError } from 'rxjs';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async createUser(email: string, password: string, name: string, lastName: string) {
        const user = this.userRepository.create({ email, password, name, lastName });
        return await this.userRepository.save(user);
    }

    async findAllUsers() {
        return await this.userRepository.find();
    }

    async findOneUser(id: number) {
        return await this.userRepository.findOne({ where: { id } });
    }

    async findOneByEmail(email: string) {
        return await this.userRepository.findOne({ where: { email } });
    }

    async updateUser(id: number, data: Partial<User>) {
        await this.userRepository.update(id, data);
        return this.findOneUser(id);
    }

    async deleteUser(id: number) {
        return await this.userRepository.softDelete(id);
    }
}

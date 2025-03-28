import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async register(email: string, password: string, name: string, lastName: string) {
        const user = await this.userService.findOneByEmail(email);
        if (user) throw new BadRequestException("Email already in use")
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userService.createUser(email, hashedPassword, name, lastName);
    }

    async login(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email);
        if (!user) throw new NotFoundException()

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

        const payload = { id: user.id, email: user.email, role: user.role };
        return { access_token: this.jwtService.sign(payload) };
    }
}

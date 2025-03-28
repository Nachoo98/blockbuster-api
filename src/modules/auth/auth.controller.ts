import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserPostDto } from '../user/dto/user.post.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() userData: UserPostDto) {
        return this.authService.register(userData.email, userData.password, userData.name, userData.lastName);
    }

    @Post('login')
    async login(@Body() loginData: LoginDto) {
        return this.authService.login(loginData.email, loginData.password);
    }
}

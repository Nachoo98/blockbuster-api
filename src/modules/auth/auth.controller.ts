import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserPostDto } from '../user/dto/user.post.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: UserPostDto })
  async register(@Body() userData: UserPostDto) {
    return this.authService.register(userData);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() loginData: LoginDto) {
    return this.authService.login(loginData.email, loginData.password);
  }
}

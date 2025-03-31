import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UserPostDto } from '../../user/dto/user.post.dto';
import { LoginDto } from '../dto/login.dto';
import { Role } from '../../../modules/user/enum/role.enum';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest
      .fn()
      .mockImplementation((userData) =>
        Promise.resolve({ id: 1, ...userData }),
      ),
    login: jest
      .fn()
      .mockImplementation((email, password) =>
        Promise.resolve({ accessToken: 'mock-token' }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('Debe registrar un usuario', async () => {
    const userDto: UserPostDto = {
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123456',
      role: Role.USER,
    };

    const result = await authController.register(userDto);

    expect(result).toEqual({ id: 1, ...userDto });
    expect(authService.register).toHaveBeenCalledWith(userDto);
  });

  it('Debe loguear un usuario', async () => {
    const loginDto: LoginDto = {
      email: 'john@example.com',
      password: '123456',
    };

    const result = await authController.login(loginDto);

    expect(result).toEqual({ accessToken: 'mock-token' });
    expect(authService.login).toHaveBeenCalledWith(
      loginDto.email,
      loginDto.password,
    );
  });
});

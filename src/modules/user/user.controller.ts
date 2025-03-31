import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { Roles } from 'src/common/decorator/role.decorator';
import { RoleGuard } from 'src/common/guard/role.guard';
import { JwtAuthGuard } from 'src/common/guard/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from './enum/role.enum';

@Controller()
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.ADMIN)
  async getUsers(): Promise<Partial<User>[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  async getUserById(@Param('id') id: number): Promise<Partial<User>> {
    return this.userService.findUserByIdOrFail(id);
  }
}

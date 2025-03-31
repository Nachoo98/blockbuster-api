import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Role } from '../enum/role.enum';

@Exclude()
export class UserDto {
  @ApiProperty({ example: 1, description: 'ID del usuario' })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Correo electrónico del usuario',
  })
  @Expose()
  email: string;

  @ApiProperty({ example: 'John', description: 'Nombre del usuario' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'Doe', description: 'Apellido del usuario' })
  @Expose()
  lastName: string;

  @ApiProperty({ example: 'admin', enum: Role, description: 'Rol del usuario' })
  @Expose()
  role: Role;

  @ApiProperty({
    example: '2025-03-27T12:00:00.000Z',
    description: 'Fecha de creación',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    example: '2025-03-27T12:00:00.000Z',
    description: 'Fecha de actualización',
  })
  @Expose()
  updatedAt: Date;
}

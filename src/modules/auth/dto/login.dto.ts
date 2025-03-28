import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'user@example.com', description: 'Correo electrónico del usuario' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'SecurePassword123', description: 'Contraseña del usuario' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}

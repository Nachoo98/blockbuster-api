import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from 'src/common/jwt/jwt.strategy';
import { AuthController } from './auth.controller';


@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: 'your_secret_key',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule { }

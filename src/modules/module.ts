import { Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { VersionModule } from './version/version.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';

const routes: Routes = [
  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'movie',
    module: MovieModule,
  },
  {
    path: 'user',
    module: UserModule,
  },
  {
    path: 'version',
    module: VersionModule,
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AuthModule,
    MovieModule,
    UserModule,
    VersionModule,
  ],
})
export class Modules {}

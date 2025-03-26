import { Module } from '@nestjs/common';
import ConfigModule from '../config/config.module';
import { Modules } from 'src/modules/module';


@Module({
  imports: [ConfigModule, Modules],
  providers: [],
})
export class AppModule { }

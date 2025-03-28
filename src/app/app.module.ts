import { Module } from '@nestjs/common';
import ConfigModule from '../config/config.module';
import { Modules } from 'src/modules/module';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [ConfigModule, DatabaseModule, Modules],
  providers: [],
})
export class AppModule { }

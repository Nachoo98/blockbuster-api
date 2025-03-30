import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';


@Module({
    imports: [HttpModule, TypeOrmModule.forFeature([Movie])],
    providers: [MovieService],
    controllers: [MovieController],
    exports: [MovieService]
})
export class MovieModule { }

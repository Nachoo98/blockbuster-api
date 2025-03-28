import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';


@Module({
    imports: [HttpModule],
    providers: [MovieService],
    controllers: [MovieController],
    exports: [MovieService]
})
export class MovieModule { }

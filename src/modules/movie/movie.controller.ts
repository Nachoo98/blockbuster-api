import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller()
export class MovieController {
    constructor(private readonly movieService: MovieService) { }

    @Get()
    async getPopularMovies() {
        return this.movieService.getStarWarsMovies();
    }
}

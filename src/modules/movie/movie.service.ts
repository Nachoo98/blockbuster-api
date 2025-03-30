import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Movie } from './entity/movie.entity';
import { CreateMovieDto } from './dto/movie.post.dto';
import { UpdateMovieDto } from './dto/movie.update.dto';


@Injectable()
export class MovieService {
    constructor(
        private readonly httpService: HttpService,
        @InjectRepository(Movie)
        private readonly movieRepository: Repository<Movie>,
    ) { }

    async getStarWarsMovies() {
        const response = await lastValueFrom(
            this.httpService.get('https://swapi.dev/api/films')
        );

        const movies = response.data.results.map((film) => ({
            title: film.title,
            episodeId: film.episode_id,
            director: film.director,
            producer: film.producer,
            releaseDate: film.release_date,
        }));

        return this.movieRepository.save(movies);
    }


    async findAllMovies() {
        return this.movieRepository.find({ where: { deletedAt: IsNull() } });
    }

    async findOne(id: number) {
        const movie = await this.movieRepository.findOne({ where: { id, deletedAt: IsNull() } });
        if (!movie) throw new NotFoundException(`Movie with ID ${id} not found`);
        return movie;
    }

    async createMovie(createMovieDto: CreateMovieDto) {
        const movie = this.movieRepository.create(createMovieDto);
        return this.movieRepository.save(movie);
    }

    async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
        await this.movieRepository.update(id, updateMovieDto);
        return this.findOne(id);
    }
    async deleteMovie(id: number) {
        const movie = await this.movieRepository.findOne({ where: { id } });
        if (!movie) throw new NotFoundException(`Movie with ID ${id} not found`);

        await this.movieRepository.softRemove(movie);
        return { message: 'Movie soft deleted successfully' };
    }
}

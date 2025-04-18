import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/movie.post.dto';
import { UpdateMovieDto } from './dto/movie.update.dto';
import { JwtAuthGuard } from '../../common/guard/jwt.guard';
import { RoleGuard } from '../../common/guard/role.guard';
import { Roles } from '../../common/decorator/role.decorator';
import { Role } from '../user/enum/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller()
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth()
export class MovieController {
    constructor(private readonly movieService: MovieService) { }

    @Get()
    @Roles(Role.ADMIN, Role.USER)
    async getSWMovies() {
        return this.movieService.findAllMovies();
    }

    @Get(':id')
    @Roles(Role.USER)
    async getMovie(@Param('id') id: number) {
        return this.movieService.findOne(id);
    }

    @Post()
    @Roles(Role.ADMIN)
    async createMovie(@Body() createMovieDto: CreateMovieDto) {
        return this.movieService.createMovie(createMovieDto);
    }

    @Patch(':id')
    @Roles(Role.ADMIN)
    async updateMovie(
        @Param('id') id: number,
        @Body() updateMovieDto: UpdateMovieDto,
    ) {
        return this.movieService.updateMovie(id, updateMovieDto);
    }

    @Post('from-api')
    @Roles(Role.ADMIN)
    async createSWMovies() {
        return this.movieService.getStarWarsMovies();
    }

    @Delete(':id')
    @Roles(Role.ADMIN)
    async deleteMovie(@Param('id') id: number) {
        return this.movieService.deleteMovie(id);
    }
}

import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from '../movie.controller';
import { MovieService } from '../movie.service';
import { CreateMovieDto } from '../dto/movie.post.dto';
import { UpdateMovieDto } from '../dto/movie.update.dto';

describe('MovieController', () => {
  let movieController: MovieController;
  let movieService: MovieService;

  const mockMovieService = {
    findAllMovies: jest.fn().mockResolvedValue([{ id: 1, title: 'Star Wars' }]),
    findOne: jest
      .fn()
      .mockImplementation((id) => Promise.resolve({ id, title: 'Mock Movie' })),
    createMovie: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: 1, ...dto })),
    updateMovie: jest
      .fn()
      .mockImplementation((id, dto) => Promise.resolve({ id, ...dto })),
    deleteMovie: jest.fn().mockResolvedValue({ deleted: true }),
    getStarWarsMovies: jest.fn().mockResolvedValue(['Movie1', 'Movie2']),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [{ provide: MovieService, useValue: mockMovieService }],
    }).compile();

    movieController = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
  });

  it('Debe retornar todas las películas', async () => {
    expect(await movieController.getSWMovies()).toEqual([
      { id: 1, title: 'Star Wars' },
    ]);
  });

  it('Debe retornar una película por ID', async () => {
    expect(await movieController.getMovie(1)).toEqual({
      id: 1,
      title: 'Mock Movie',
    });
    expect(movieService.findOne).toHaveBeenCalledWith(1);
  });

  it('Debe crear una película', async () => {
    const dto: CreateMovieDto = {
      title: 'New Movie',
      episodeId: 8,
      director: 'John Doe',
      producer: 'Lucas Film',
      releaseDate: '20-10-1990',
    };
    expect(await movieController.createMovie(dto)).toEqual({ id: 1, ...dto });
    expect(movieService.createMovie).toHaveBeenCalledWith(dto);
  });

  it('Debe actualizar una película', async () => {
    const dto: UpdateMovieDto = { title: 'Updated Movie' };
    expect(await movieController.updateMovie(1, dto)).toEqual({
      id: 1,
      title: 'Updated Movie',
    });
    expect(movieService.updateMovie).toHaveBeenCalledWith(1, dto);
  });

  it('Debe eliminar una película', async () => {
    expect(await movieController.deleteMovie(1)).toEqual({ deleted: true });
    expect(movieService.deleteMovie).toHaveBeenCalledWith(1);
  });

  it('Debe obtener películas desde la API externa', async () => {
    expect(await movieController.createSWMovies()).toEqual([
      'Movie1',
      'Movie2',
    ]);
  });
});

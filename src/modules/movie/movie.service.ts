import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MovieService {
    constructor(private readonly httpService: HttpService) { }


    async getStarWarsMovies() {
        const response = await lastValueFrom(
            this.httpService.get('https://swapi.dev/api/films')
        );
        return response.data;
    }

}

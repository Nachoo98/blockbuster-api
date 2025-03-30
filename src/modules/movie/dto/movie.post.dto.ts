import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateMovieDto {
    @ApiProperty({ example: 'A new Era', description: 'Title of the episode' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: 1, description: 'Number of espisode' })
    @IsNotEmpty()
    @IsInt()
    episodeId: number;

    @ApiProperty({ example: 'John Doe', description: 'The name of the director' })
    @IsNotEmpty()
    @IsString()
    director: string;

    @ApiProperty({ example: 'Lucas Film', description: 'The name of the producer' })
    @IsNotEmpty()
    @IsString()
    producer: string;

    @ApiProperty({ example: '10-03-1995', description: 'Release date of the movie' })
    @IsNotEmpty()
    @IsString()
    releaseDate: string;
}

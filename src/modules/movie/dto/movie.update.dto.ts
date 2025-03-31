import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateMovieDto {
  @ApiProperty({ example: 'A new Era', description: 'Title of the episode' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 1, description: 'Number of espisode' })
  @IsOptional()
  @IsInt()
  episodeId?: number;

  @ApiProperty({ example: 'John Doe', description: 'The name of the director' })
  @IsOptional()
  @IsString()
  director?: string;

  @ApiProperty({
    example: 'Lucas Film',
    description: 'The name of the producer',
  })
  @IsOptional()
  @IsString()
  producer?: string;

  @ApiProperty({
    example: '10-03-1995',
    description: 'Release date of the movie',
  })
  @IsOptional()
  @IsString()
  releaseDate?: string;
}

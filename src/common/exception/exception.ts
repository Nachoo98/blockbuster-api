import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFound extends HttpException {
  constructor(private readonly entity: string) {
    super(`${entity} not found.`, HttpStatus.NOT_FOUND);
  }
}

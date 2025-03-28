import { Injectable, HttpException, HttpStatus, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((error) => {
                if (error.response) {
                    if (error.response.status === 404) {
                        throw new HttpException(
                            'Resource not found - External API returned 404',
                            HttpStatus.BAD_REQUEST,
                        );
                    }

                    if (error.response.status === 500) {
                        throw new HttpException(
                            'Internal Server Error - External API returned 500',
                            HttpStatus.INTERNAL_SERVER_ERROR,
                        );
                    }

                    throw new HttpException(
                        'An error occurred while fetching data.',
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
                }

                throw new HttpException(
                    'An unexpected error occurred.',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }),
        );
    }
}

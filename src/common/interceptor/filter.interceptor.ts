import { Injectable } from '@nestjs/common/decorators'
import { CallHandler, ExecutionContext, HttpStatus, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'

export interface IResponse<T> {
    data: T
}

@Injectable()
export class GlobalInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
        return next.handle().pipe(
            map((data) => {
                if (Array.isArray(data) && data.length === 0) {
                    context.switchToHttp().getResponse().status(HttpStatus.NO_CONTENT)
                }
                if (context.switchToHttp().getRequest().query['hub.challenge']) return data
                return { data }
            }),
        )
    }
}
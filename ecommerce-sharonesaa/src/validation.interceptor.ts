import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const obj = plainToClass(this.dto, request.body);

    return new Observable(observer => {
      validate(obj).then(errors => {
        if (errors.length > 0) {
          observer.error(new BadRequestException('Validation failed'));
        } else {
          observer.next(next.handle());
          observer.complete();
        }
      }).catch(err => {
        observer.error(new BadRequestException(err.message));
      });
    }).pipe(
      catchError(err => {
        return throwError(() => new BadRequestException(err.message));
      })
    );
  }
}


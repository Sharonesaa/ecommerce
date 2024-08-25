import { CallHandler, ExecutionContext, Injectable, NestInterceptor, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  constructor(private readonly dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const obj = plainToInstance(this.dto, request.body);

    return from(validate(obj)).pipe(
      switchMap(errors => {
        if (errors.length > 0) {
          const errorMessages = errors.map(error => ({
            property: error.property,
            constraints: error.constraints,
          }));
          throw new BadRequestException({
            message: 'Validation failed',
            errors: errorMessages,
          });
        }
        return next.handle();
      }),
      catchError(err => throwError(() => new BadRequestException(err.message)))
    );
  }
}

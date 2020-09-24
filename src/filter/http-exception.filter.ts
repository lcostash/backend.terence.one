import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, ValidationError } from '@nestjs/common';
import { Response } from 'express';
import { FieldMessageInterface } from '../interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    if (status === HttpStatus.BAD_REQUEST) {
      const fms: FieldMessageInterface[] = [];
      if (typeof exception.getResponse()['message'] !== 'undefined') {
        exception.getResponse()['message'].forEach((error: ValidationError) => {
          const mes = Object.keys(error.constraints).map(key => error.constraints[key])[0];
          fms.push({
            id: error.property,
            message: mes,
          });
        });
      }
      response.status(status).json({
        status: status,
        fm: fms,
      });
    } else {
      response.status(status).json({
        status: status,
        message: message,
      });
    }
  }
}

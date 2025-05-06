import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let responseBody: Record<string, any> = {
      statusCode: status,
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      const exResponse = exception.getResponse();
      responseBody =
        typeof exResponse === 'string'
          ? { statusCode: status, message: exResponse }
          : { statusCode: status, ...(exResponse as object) };
    }

    responseBody.timestamp = new Date().toISOString();
    responseBody.path = request.url;

    console.error('Unhandled exception:', exception);

    response.status(status).json(responseBody);
  }
}

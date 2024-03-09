import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { MyResponseObj } from 'src/constant';
import { Request, Response } from 'express';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myresponseObj: MyResponseObj = {
      statusCode: 500,
      timeStamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      myresponseObj.statusCode = exception.getStatus();
      myresponseObj.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      myresponseObj.statusCode = 422;
      myresponseObj.response = exception.message.replace(/\n/g, '');
    } else {
      myresponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myresponseObj.response = 'Internal Server Error';
    }
    response.status(myresponseObj.statusCode).json(myresponseObj);

    this.logger.error(myresponseObj.response, AllExceptionsFilter.name);

    super.catch(exception, host);
  }
}

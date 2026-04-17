import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (this.isStandardErrorResponse(exceptionResponse)) {
        response.status(status).json(exceptionResponse);
        return;
      }

      if (status >= 500) {
        this.logger.error(
          `HttpException ${status} at ${request.method} ${request.url} - ${JSON.stringify(exceptionResponse)}`,
        );
      } else {
        this.logger.warn(
          `HttpException ${status} at ${request.method} ${request.url} - ${JSON.stringify(exceptionResponse)}`,
        );
      }

      response.status(status).json({
        success: false,
        code: this.mapHttpStatusToCode(status),
      });

      return;
    }

    this.logger.error(
      `Unhandled exception at ${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
    });
  }

  private isStandardErrorResponse(
    value: unknown,
  ): value is { success: boolean; code: string } {
    if (typeof value !== 'object' || value === null) return false;

    return (
      'success' in value && 'code' in value && typeof value.code === 'string'
    );
  }

  private mapHttpStatusToCode(status: number): string {
    const statusCodeMap: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'UNPROCESSABLE_ENTITY',
      429: 'TOO_MANY_REQUESTS',
    };

    return (
      statusCodeMap[status] ??
      (status >= 500 ? 'INTERNAL_SERVER_ERROR' : 'HTTP_EXCEPTION')
    );
  }
}

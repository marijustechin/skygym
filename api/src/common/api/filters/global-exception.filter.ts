import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

type StandardErrorResponse = {
  success: false;
  code: string;
  details?: unknown;
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const response = ctx.getResponse<FastifyReply>();

    if (!(exception instanceof HttpException)) {
      this.handleUnknownException(exception, request, response);
      return;
    }

    const status = exception.getStatus();
    const rawResponse = exception.getResponse();

    this.logHttpException(status, request, rawResponse);

    const payload = this.normalizeHttpException(status, rawResponse);

    response.status(status).send(payload);
  }

  private handleUnknownException(
    exception: unknown,
    request: FastifyRequest,
    response: FastifyReply,
  ): void {
    this.logger.error(
      `Unhandled exception at ${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : String(exception),
    );

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
    });
  }

  private logHttpException(
    status: number,
    request: FastifyRequest,
    rawResponse: unknown,
  ): void {
    const message = `HttpException ${status} at ${request.method} ${request.url} - ${JSON.stringify(rawResponse)}`;

    if (status >= 500) {
      this.logger.error(message);
      return;
    }

    this.logger.warn(message);
  }

  private normalizeHttpException(
    status: number,
    rawResponse: unknown,
  ): StandardErrorResponse {
    // 1. already normalized
    if (this.isStandardErrorResponse(rawResponse)) {
      return rawResponse;
    }

    // 2. string response
    if (typeof rawResponse === 'string') {
      return {
        success: false,
        code: rawResponse,
      };
    }

    // 3. object with message
    if (typeof rawResponse === 'object' && rawResponse !== null) {
      const message = (rawResponse as { message?: unknown }).message;

      if (typeof message === 'string') {
        return {
          success: false,
          code: message,
        };
      }

      if (Array.isArray(message)) {
        return {
          success: false,
          code: 'VALIDATION_FAILED',
          details: message,
        };
      }
    }

    // 4. fallback
    return {
      success: false,
      code: this.mapHttpStatusToCode(status),
    };
  }

  private isStandardErrorResponse(
    value: unknown,
  ): value is StandardErrorResponse {
    if (typeof value !== 'object' || value === null) return false;

    return (
      'success' in value &&
      'code' in value &&
      typeof (value as { code: unknown }).code === 'string'
    );
  }

  private mapHttpStatusToCode(status: number): string {
    const map: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'UNPROCESSABLE_ENTITY',
      429: 'TOO_MANY_REQUESTS',
    };

    return map[status] ?? 'HTTP_EXCEPTION';
  }
}

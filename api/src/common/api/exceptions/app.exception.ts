import { HttpException, HttpStatus } from '@nestjs/common';
import type { ApiErrorResponse } from '../types/api-response.types';

export class AppException extends HttpException {
  constructor(status: HttpStatus, code: string, details?: string[]) {
    const responseBody: ApiErrorResponse = {
      success: false,
      code,
      ...(details ? { details } : {}),
    };

    super(responseBody as Record<string, any>, status);
  }
}

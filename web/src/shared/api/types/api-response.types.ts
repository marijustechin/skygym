// TEMP: duplicated in backend and frontend
// Backend: src/common/types
// Frontend: src/shared/api/types

export type ApiSuccessResponse<T = unknown> = {
  success: true;
  code: string;
  data?: T;
};

export type ApiErrorResponse = {
  success: false;
  code: string;
  details?: string[];
};

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

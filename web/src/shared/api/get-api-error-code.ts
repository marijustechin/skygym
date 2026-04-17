import axios from 'axios';

export function getApiErrorCode(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.code ?? 'MISSING_RESPONSE_CODE';
  }
  if (error instanceof Error) return error.message;
  return 'UNKNOWN_ERROR';
}

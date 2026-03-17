import axios from 'axios';

export function getApiErrorCode(error: unknown): string {
  if (axios.isAxiosError(error)) return error.response?.data.message;
  if (error instanceof Error) return error.message;
  return 'Unexpected error';
}

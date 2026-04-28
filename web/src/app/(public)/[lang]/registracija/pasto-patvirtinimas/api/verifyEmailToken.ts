import $axios from '@/shared/api/axios';
import { ApiResponse } from '@/shared/api/types/api-response.types';

export async function verifyEmailToken(
  verificationTokenRaw: string,
): Promise<ApiResponse> {
  const response = await $axios.post('/auth/verify-email', {
    verificationTokenRaw,
  });

  return response.data;
}

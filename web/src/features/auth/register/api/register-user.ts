import $axios from '@/shared/api/axios';
import { TRegisterPayload } from '../model/register.types';
import { ApiResponse } from '@/shared/api/types/api-response.types';

export async function registerUser(
  payload: TRegisterPayload,
): Promise<ApiResponse> {
  const response = await $axios.post('/auth/register', payload);

  return response.data;
}

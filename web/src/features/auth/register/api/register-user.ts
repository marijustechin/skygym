import $axios from '@/shared/api/axios';
import { TRegisterPayload } from '../model/register.types';

export async function registerUser(payload: TRegisterPayload): Promise<string> {
  const response = await $axios.post('/auth/register', payload);

  return response.data;
}

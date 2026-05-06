import $axios from '@/shared/api/axios';
import { TContactPayload } from '../model/contact.types';

export const submitContact = async (
  payload: TContactPayload,
): Promise<{ success: boolean; code: string }> => {
  const { data } = await $axios.post<{ success: boolean; code: string }>(
    '/contact',
    payload,
  );
  return data;
};

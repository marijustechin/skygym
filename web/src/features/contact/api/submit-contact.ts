import { TContactPayload } from '../model/contact.types';

// ⚠️ Actual API call will be wired here once the backend endpoint is ready.
// Expected response shape: { code: 'CONTACT_FORM_SUBMITTED' | string }

export const submitContact = async (
  _payload: TContactPayload,
): Promise<{ code: string }> => {
  // TODO: Replace with real fetch when the endpoint exists:
  //
  // const res = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload),
  // });
  // return res.json();

  // Simulated success response for now.
  return { code: 'CONTACT_FORM_SUBMITTED' };
};

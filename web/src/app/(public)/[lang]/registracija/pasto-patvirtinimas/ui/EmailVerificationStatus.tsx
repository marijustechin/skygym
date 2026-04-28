'use client';

import { Language } from '@/shared/config/i18n/config';
import { FormsDictionary } from '@/shared/config/i18n/dictionary';
import { useEffect, useState } from 'react';
import { verifyEmailToken } from '../api/verifyEmailToken';
import { getApiErrorCode } from '@/shared/api/get-api-error-code';
import { getApiMessage } from '@/shared/api/get-api-message';

type EmailVerificationStatusProps = {
  lang: Language;
  token: string;
  dict: FormsDictionary;
};

export const EmailVerificationStatus = ({
  lang,
  token,
  dict,
}: EmailVerificationStatusProps) => {
  const normalizedToken = token.trim();
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    let ignore = false;

    const runVerification = async () => {
      try {
        setStatus('loading');

        const res = await verifyEmailToken(normalizedToken);
        if (ignore) return;

        setResponse(getApiMessage(res.code, dict.api));
        setStatus(res.success ? 'success' : 'error');
      } catch (error) {
        let code = getApiErrorCode(error);
        if (code === 'VALIDATION_FAILED')
          code = 'EMAIL_VERIFICATION_TOKEN_INVALID';
        setResponse(getApiMessage(code, dict.api));
      }
    };

    runVerification();

    return () => {
      ignore = true;
    };
  }, [status, normalizedToken, dict.api]);

  console.log('Api response: ', response);

  if (response) {
    return (
      <div>
        <h1>{response}</h1>
      </div>
    );
  }
};

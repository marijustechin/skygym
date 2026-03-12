'use client';

import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();

  return <div className='text-black'>{t('home_page.title')}</div>;
}

import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('contacts_page.title')}</h1>
    </div>
  );
}

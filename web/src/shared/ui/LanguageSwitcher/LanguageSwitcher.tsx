import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ASSETS } from '@/shared/const/assets';
import styles from './LanguageSwitcher.module.css';

const languages = [
  { code: 'lt', flag: ASSETS.FLAGS.LT, label: 'Lietuvių' },
  { code: 'en', flag: ASSETS.FLAGS.EN, label: 'English' },
  { code: 'ru', flag: ASSETS.FLAGS.RU, label: 'Русский' },
];

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();

  const currentLang = languages.find((l) => l.code === i18n.language);
  const filteredLanguages = languages.filter((l) => l.code !== i18n.language);

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng', code);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={styles.button}
      >
        {currentLang && <img src={currentLang.flag} alt={currentLang.label} />}
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {filteredLanguages.map((lang) => (
            <button
              className={styles.button}
              key={lang.label}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <img src={lang.flag} alt={lang.label} />{' '}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

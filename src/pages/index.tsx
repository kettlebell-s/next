import React, { useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { setCookieByName } from '@helpers/cookie.helper';
import { LANGUAGES } from '@constants/other.constants';
import { Page } from '../types/next.types';

const IndexPage: Page = () => {
  const router = useRouter();
  const { t, i18n: { language } } = useTranslation(['common']);

  const currentLanguage = useMemo(() => LANGUAGES.find(({ value }) => value === language)?.name || 'English', [LANGUAGES, language]);

  const handleChangeLanguage = (lang: string) => {
    setCookieByName('NEXT_LOCALE', lang);
    const { pathname } = router;
    router.push(pathname, pathname, { locale: lang });
  };

  return (
    <div>
      <h2>{t('indexPage')}</h2>
      <br />
      <Link href="/second">{t('toSecondPage')}</Link>
      <br />
      <br />
      <h3>{currentLanguage}</h3>
      <br />
      <div>
        {LANGUAGES.map(({ name, value }) => (
          <button
            key={value}
            onClick={() => handleChangeLanguage(value)}
            style={{display: 'block', fontSize: '20px'}}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

IndexPage.allowWithoutAuth = true;

export default IndexPage;

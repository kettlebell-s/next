import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { PATH_INDEX } from '@constants/routes.constants';
import { Page } from '../../types/next.types';

const SecondPage: Page = () => {
  const { t } = useTranslation(['common']);

  return (
    <div>
      <h2>{t('secondPage')}</h2>
      <br />
      <br />
      <Link href={PATH_INDEX}>{t('toIndex')}</Link>
    </div>
  );
};

SecondPage.allowWithoutAuth = true;

export default SecondPage;

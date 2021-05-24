import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { ServerResponse } from 'http';
import { SWRConfig } from 'swr';
import ReactModal from 'react-modal';
import { AppProps } from 'next/app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ApolloProvider } from '@apollo/client/react';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { wrapper } from '@components/Store';
import { bindUser } from '@redux/user.redux';
import { getCookieByName } from '@helpers/cookie.helper';
import ReduxConfirmModal from '@containers/modals/ReduxConfirmModal';
import { apolloClient } from '@helpers/apollo.helper';
import { CONFIG } from '@constants/config.constants';
import { PATH_SIGN_IN } from '@constants/routes.constants';
import { Page } from '../types/next.types';
import '@assets/scss/global.scss';
import 'react-toastify/dist/ReactToastify.css';

ReactModal.setAppElement('#__next');
const redirect = (res: ServerResponse, path: string) => {
  if (typeof res.writeHead === 'function' && typeof res.end === 'function') {
    res.writeHead(302, { Location: path });
    res.end();
  }
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const { locale, pathname } = router;
    const lang = getCookieByName('NEXT_LOCALE') || CONFIG.I18N_CONFIG.i18n.defaultLocale;
    if (lang !== locale) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(pathname, pathname, { locale: lang });
    }
  }, []);

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
      }}
    >
      <script src="https://static.geetest.com/static/tools/gt.js" />
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
      <ReduxConfirmModal />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </SWRConfig>
  );
};

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
  const locale = (ctx.req as any)?.cookies?.NEXT_LOCALE || CONFIG.I18N_CONFIG.i18n.defaultLocale;
  if (ctx.res && !ctx.pathname.includes('/_error')) {
    await store.dispatch(bindUser());
    if (!(Component as Page).allowWithoutAuth && !store.getState().user) {
      redirect(ctx.res, PATH_SIGN_IN);
      return { pageProps: {} };
    }
  }

  return {
    pageProps: {
      ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
      pathname: ctx.pathname,
      user: store.getState().user,
      ...((ctx.req as any)?.cookies
        ? await serverSideTranslations(locale, ['common'], CONFIG.I18N_CONFIG) : {}
      ),
    },
  };
});

export default wrapper.withRedux(appWithTranslation(MyApp));

const {
  API_URL, IS_PROD, REDUX_DEBUG,
  CSRF_TOKEN, I18N_CONFIG,
} = require('config');
const withImages = require('next-images');

module.exports = withImages({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'vi', 'zh-CN'],
  },
  publicRuntimeConfig: {
    API_URL,
    IS_PROD,
    REDUX_DEBUG,
    CSRF_TOKEN,
    I18N_CONFIG,
  },
  trailingSlash: true,
  webpack(config, { isServer }) {
    // Fixes npm packages that depend on `fs`, `net`, `tls` modules
    if (!isServer) {
      config.node = {
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
});

export type ConfigType = {
  API_URL: string;
  IS_PROD: boolean;
  REDUX_DEBUG: boolean;
  CSRF_TOKEN: string;
  I18N_CONFIG: {
    i18n: {
      defaultLocale: string;
      locales: string[];
    }
  };
}

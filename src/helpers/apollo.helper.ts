import {
  ApolloClient,
  InMemoryCache,
  DefaultOptions,
  HttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { CONFIG } from '@constants/config.constants';
import { IS_BROWSER } from '@constants/other.constants';
import { getCookieByName } from '@helpers/cookie.helper';

const httpLink = new HttpLink({
  uri: 'http://0.0.0.0:7009/graphql',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  let csrfToken = CONFIG.CSRF_TOKEN;

  if (IS_BROWSER) {
    csrfToken = getCookieByName('csrfToken') || CONFIG.CSRF_TOKEN;
  }

  return {
    headers: {
      ...headers,
      'x-csrf-token': csrfToken,
      'x-csrf-token-portal': csrfToken,
    },
  };
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all',
  },
};

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions,
});

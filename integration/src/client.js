import React from 'react';
import { ClientUni } from '@jtart/uni';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { hydrate } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import routes from './app/routes';

const client = new ApolloClient({
  ssrForceFetchDelay: 100,
  link: createHttpLink({
    uri: 'https://fakerql.com/graphql',
  }),
  cache: new InMemoryCache().restore(window.__APOLLO_DATA__),
});

const App = (
  <HelmetProvider>
    <ApolloProvider client={client}>
      <ClientUni routes={routes} />
    </ApolloProvider>
  </HelmetProvider>
);

hydrate(App, document.getElementById('__uni__'));

if (module.hot) {
  module.hot.accept();
}

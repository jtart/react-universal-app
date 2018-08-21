import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const clientWrapper = App => {
  const client = new ApolloClient({
    ssrForceFetchDelay: 100,
    link: createHttpLink({
      uri: 'https://fakerql.com/graphql',
    }),
    cache: new InMemoryCache().restore(window.__APOLLO_DATA__),
  });

  return <ApolloProvider client={client}>{App}</ApolloProvider>;
};

export default clientWrapper;

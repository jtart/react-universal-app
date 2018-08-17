import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const clientWrapper = App => {
  const data = JSON.parse(
    window.document.getElementById('__APOLLO_DATA__').textContent,
  );

  const client = new ApolloClient({
    ssrForceFetchDelay: 100,
    link: createHttpLink({
      uri: 'https://fakerql.com/graphql',
    }),
    cache: new InMemoryCache().restore(data),
  });

  return <ApolloProvider client={client}>{App}</ApolloProvider>;
};

export default clientWrapper;

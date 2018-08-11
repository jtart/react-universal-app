import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ServerData } from '@jtart/uni';

function withWrapper(App) {
  this.sheet = new ServerStyleSheet();

  this.client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'https://fakerql.com/graphql',
    }),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {this.sheet.collectStyles(App)}
    </ApolloProvider>
  );
}

withWrapper.getTags = function() {
  const styles = this.sheet.getStyleElement();

  const initialApolloData = this.client.extract();

  return [styles, <ServerData id="__APOLLO_DATA__" data={initialApolloData} />];
};

export default withWrapper;

import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

async function serverWrapper(App) {
  this.sheet = new ServerStyleSheet();

  this.client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'https://fakerql.com/graphql',
      fetch: fetch,
    }),
    cache: new InMemoryCache(),
  });

  const apolloApp = (
    <ApolloProvider client={this.client}>
      {this.sheet.collectStyles(App)}
    </ApolloProvider>
  );

  try {
    await getDataFromTree(apolloApp);
  } catch (error) {
    console.log(error);
  }

  return apolloApp;
}

serverWrapper.getAdditionalHeadElements = function() {
  const styles = this.sheet.getStyleTags();

  const initialApolloData = this.client.extract();
  const serialisedData = JSON.stringify(initialApolloData).replace(
    /</g,
    '\\u003c',
  );

  return [
    ...styles,
    `<script>window.__APOLLO_DATA__ = ${serialisedData}</script>`,
  ];
};

export default serverWrapper;

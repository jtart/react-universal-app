import React from 'react';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ServerData } from '@jtart/uni';
import fetch from 'node-fetch';

async function serverWrapper(App) {
  this.client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'https://fakerql.com/graphql',
      fetch: fetch,
    }),
    cache: new InMemoryCache(),
  });

  const apolloApp = <ApolloProvider client={this.client}>{App}</ApolloProvider>;

  try {
    await getDataFromTree(apolloApp);
  } catch (error) {
    console.log(error);
  }

  return apolloApp;
}

serverWrapper.getAdditionalHeadProps = function() {
  const initialApolloData = this.client.extract();

  return [<ServerData id="__APOLLO_DATA__" data={initialApolloData} />];
};

export default serverWrapper;

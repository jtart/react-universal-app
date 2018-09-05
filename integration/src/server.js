import React from 'react';
import express from 'express';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { ServerUni, loadInitialData } from '@jtart/uni';

import Document from './Document';
import routes from './app/routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async ({ url }, res) => {
    let data;

    try {
      data = await loadInitialData(url, routes);
    } catch (error) {
      res.sendStatus(404);
      return;
    }

    const sheet = new ServerStyleSheet();

    const client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: 'https://fakerql.com/graphql',
        fetch: fetch,
      }),
      cache: new InMemoryCache(),
    });

    const helmetContext = {};
    const App = (
      <HelmetProvider context={helmetContext}>
        <ApolloProvider client={client}>
          <StyleSheetManager sheet={sheet.instance}>
            <ServerUni url={url} routes={routes} data={data} />
          </StyleSheetManager>
        </ApolloProvider>
      </HelmetProvider>
    );

    getDataFromTree(App).then(() => {
      const renderedApp = renderToString(App);

      const { helmet } = helmetContext;
      const scripts = [assets.client.js];
      const styles = sheet.getStyleTags();
      const apolloData = client.extract();

      const document = Document(
        helmet,
        renderedApp,
        data,
        scripts,
        styles,
        apolloData,
      );

      res.send(document);
    });
  });

export default server;

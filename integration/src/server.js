import React from 'react';
import express from 'express';
import { ServerStyleSheet } from 'styled-components';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { ServerApp, loadInitialData } from 'react-universal-app';

import Document from './Document';
import routes from './app/routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async ({ url }, res) => {
    try {
      const data = await loadInitialData(url, routes);

      const sheet = new ServerStyleSheet();

      const helmetContext = {};
      const App = sheet.collectStyles(
        <HelmetProvider context={helmetContext}>
          <ServerApp data={data} routes={routes} location={url} context={{}} />
        </HelmetProvider>,
      );

      const renderedApp = renderToString(App);

      const { helmet } = helmetContext;
      const scripts = [assets.client.js];
      const styles = sheet.getStyleTags();

      const document = Document(helmet, renderedApp, data, scripts, styles);

      res.send(document);
    } catch (error) {
      res.sendStatus(404);
    }
  });

export default server;

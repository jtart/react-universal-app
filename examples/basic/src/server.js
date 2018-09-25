import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import { ServerApp, loadInitialData } from 'react-universal-app';

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

    const app = renderToString(
      <ServerApp location={url} routes={routes} data={data} context={{}} />,
    );

    const scripts = [assets.client.js];

    const document = Document(app, data, scripts);

    res.send(document);
  });

export default server;

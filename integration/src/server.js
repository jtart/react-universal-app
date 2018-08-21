import express from 'express';
import { render } from '@jtart/uni';
import routes from './app/routes';
import serverWrapper from './wrappers/server';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async ({ url }, res) => {
    const scripts = [assets.client.js];

    const { statusCode, html } = await render(
      url,
      routes,
      scripts,
      serverWrapper,
    );

    if (typeof html === undefined || html === null) {
      res.sendStatus(statusCode);
    } else {
      res.status(statusCode).send(html);
    }
  });

export default server;

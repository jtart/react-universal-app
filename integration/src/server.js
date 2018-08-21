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

    try {
      const { statusCode, html } = await render(
        url,
        routes,
        scripts,
        serverWrapper,
      );
      res.status(statusCode).send(html);
    } catch (error) {
      res.sendStatus(404);
    }
  });

export default server;

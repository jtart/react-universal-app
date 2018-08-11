import express from 'express';
import { render } from '../../../';
import routes from './routes';
import withServerWrapper from './withServerWrapper';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server.get('/*', async ({ url }, res) => {
  const scripts = [assets.client.js];

  const { statusCode, html } = await render(
    url,
    routes,
    scripts,
    withServerWrapper,
  );

  res.status(statusCode).send(html);
});

server.listen(3000);

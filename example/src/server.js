import express from 'express';
import { render } from '@jtart/uni';
import routes from './app/routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const scripts = [{ ...assets.client }];
    const { statusCode, html } = await render(req, routes, scripts);

    res.status(statusCode).send(html);
  });

export default server;

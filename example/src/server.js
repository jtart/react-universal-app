import express from 'express';
import routes from './app/routes';

import { renderPage } from './src/render';

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const html = renderPage(req, routes);
    res.send(html);
  });

export default server;

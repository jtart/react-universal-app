import React from 'react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import Uni from './Uni.jsx';

export const ClientUni = ({ data, routes }) => (
  <BrowserRouter>
    <Uni initialData={data} routes={routes} />
  </BrowserRouter>
);

export const ServerUni = ({ url, routes, data, routerContext = {} }) => (
  <StaticRouter location={url} context={routerContext}>
    <Uni initialData={data} routes={routes} />
  </StaticRouter>
);

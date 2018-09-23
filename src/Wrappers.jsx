import React from 'react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import Uni from './Uni.jsx';

export const ClientUni = ({ data, routes, ...routerProps }) => (
  <BrowserRouter {...routerProps}>
    <Uni initialData={data} routes={routes} />
  </BrowserRouter>
);

export const ServerUni = ({ data, routes, ...routerProps }) => (
  <StaticRouter {...routerProps}>
    <Uni initialData={data} routes={routes} />
  </StaticRouter>
);

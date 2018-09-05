import React from 'react';
import { StaticRouter, BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

export const ClientUni = ({ routes }) => {
  const data = window.__UNI_DATA__ || {};

  return (
    <BrowserRouter>
      <App initialData={data} routes={routes} />
    </BrowserRouter>
  );
};

export const ServerUni = ({ url, routes, data, routerContext = {} }) => (
  <StaticRouter location={url} context={routerContext}>
    <App initialData={data} routes={routes} />
  </StaticRouter>
);

import React from 'react';
import { ClientApp } from 'react-universal-app';
import { hydrate } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import routes from './app/routes';

const data = window.__APP_DATA__;

const App = (
  <HelmetProvider>
    <ClientApp data={data} routes={routes} />
  </HelmetProvider>
);

hydrate(App, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

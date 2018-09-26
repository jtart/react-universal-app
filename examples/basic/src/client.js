import React from 'react';
import { ClientApp } from 'react-universal-app';
import { hydrate } from 'react-dom';

import routes from './app/routes';

const data = window.__APP_DATA__;

const App = <ClientApp data={data} routes={routes} />;

hydrate(App, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

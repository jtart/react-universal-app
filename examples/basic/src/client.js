import React from 'react';
import { ClientUni } from '@jtart/uni';
import { hydrate } from 'react-dom';

import routes from './app/routes';

const data = window.__UNI_DATA__;

const App = <ClientUni data={data} routes={routes} />;

hydrate(App, document.getElementById('__uni__'));

if (module.hot) {
  module.hot.accept();
}

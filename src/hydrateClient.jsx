import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';

const hydrateClient = (routes, withWrapper = App => App) => {
  hydrate(
    withWrapper(
      <BrowserRouter>
        <App routes={routes} initialData={window.__UNI_DATA__} />
      </BrowserRouter>,
    ),
    document.getElementById('__uni__'),
  );
};

export default hydrateClient;

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import defaultWithWrapper from './defaultWithWrapper.js';
import App from './App.jsx';

const hydrateClient = (routes, withWrapper = defaultWithWrapper) => {
  const data = JSON.parse(
    window.document.getElementById('__UNI_DATA__').textContent,
  );

  hydrate(
    withWrapper(
      <BrowserRouter>
        <App routes={routes} initialData={data} />
      </BrowserRouter>,
    ),
    document.getElementById('__uni__'),
  );
};

export default hydrateClient;

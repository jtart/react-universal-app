import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import defaultWithWrapper from './defaultWithWrapper.js';
import { fetchData } from './ServerData.jsx';
import App from './App.jsx';

const hydrateClient = (routes, withWrapper = defaultWithWrapper) => {
  const data = fetchData('__UNI_DATA__');

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

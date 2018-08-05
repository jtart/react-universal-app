import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const hydrateClient = routes => {
  const data = JSON.parse(
    window.document.getElementById('uni-data').textContent,
  );

  hydrate(
    <BrowserRouter>
      <App routes={routes} initialData={data} />
    </BrowserRouter>,
    document.getElementById('__uni__'),
  );
};

export default hydrateClient;

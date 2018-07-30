import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const hydrateClient = routes => {
  const data = JSON.parse(
    window.document.getElementById('server-data').textContent,
  );

  hydrate(
    <BrowserRouter>
      <App routes={routes} data={data} />
    </BrowserRouter>,
    document.getElementById('root'),
  );
};

export default hydrateClient;

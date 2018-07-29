import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const hydrateClient = routes => {
  const data = JSON.parse(
    window.document.getElementById('server-data').textContent,
  );

  const app = (
    <BrowserRouter>
      <App routes={routes} data={data} />
    </BrowserRouter>
  );

  const root = document.getElementById('root');

  hydrate(app, root);
};

export default hydrateClient;

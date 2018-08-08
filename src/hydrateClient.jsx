import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

const hydrateClient = routes => {
  const { textContent } = JSON.parse(
    window.document.getElementById('uni-data'),
  );

  hydrate(
    <BrowserRouter>
      <App routes={routes} initialData={textContent} />
    </BrowserRouter>,
    document.getElementById('__uni__'),
  );
};

export default hydrateClient;

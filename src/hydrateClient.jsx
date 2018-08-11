import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { fetchData } from './ServerData.jsx';

const hydrateClient = routes => {
  const data = fetchData('__UNI_DATA__');
  hydrate(
    <BrowserRouter>
      <App routes={routes} initialData={data} />
    </BrowserRouter>,
    document.getElementById('__uni__'),
  );
};

export default hydrateClient;

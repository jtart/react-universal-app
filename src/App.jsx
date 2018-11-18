import { useState, useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

import loadInitialData from './loadInitialData.js';

function App({ initialData, location, routes }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataFetch, setDataFetch] = useState(null);

  useEffect(
    () => {
      const dataFetch = loadInitialData(location.pathname, routes);

      setDataFetch(dataFetch);
      setLoading(true);
    },
    [location.pathname],
  );

  useEffect(
    async () => {
      try {
        const data = await dataFetch;

        setData(data);
        setLoading(false);
        setError(null);
        setDataFetch(null);
      } catch (error) {
        setLoading(false);
        setError(error);
        setDataFetch(null);
      }
    },
    [loading],
  );

  return renderRoutes(routes, { data, loading, error });
}

export default withRouter(App);

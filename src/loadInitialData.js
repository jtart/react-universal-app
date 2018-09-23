import { matchRoutes } from 'react-router-config';

const loadInitialData = async (url, routes) => {
  const matchedRoutes = matchRoutes(routes, url);

  if (matchedRoutes.length <= 0) {
    throw new Error(`No route was found for ${url}.`);
  }

  const { route, match } = matchedRoutes[0];

  if (!route.getInitialData) {
    return null;
  }

  try {
    return await route.getInitialData({ match });
  } catch (error) {
    throw error;
  }
};

export default loadInitialData;

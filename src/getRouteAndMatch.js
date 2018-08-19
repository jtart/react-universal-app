import { matchRoutes } from 'react-router-config';

const getRouteAndMatch = (url, routes) => {
  const matchedRoutes = matchRoutes(routes, url);
  return matchedRoutes.length > 0 ? matchedRoutes[0] : {};
};

export default getRouteAndMatch;

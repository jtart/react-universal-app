import { matchPath } from 'react-router-dom';

const getRouteAndMatch = (url, routes) => {
  let match;

  const route = routes.find(route => {
    match = matchPath(url, route);
    return match;
  });

  return { route, match };
};

export default getRouteAndMatch;

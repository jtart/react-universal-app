import { matchPath } from 'react-router-dom';
import * as urlLib from 'url';

const getPathname = url => {
  return urlLib.parse(url).pathname;
};

const getRoute = (url, routes) => {
  const pathname = getPathname(url);
  return routes.find(route => matchPath(pathname, route));
};

export default getRoute;

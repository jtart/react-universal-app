import { matchPath } from 'react-router-dom';
import * as urlLib from 'url';

const getPathname = (url) => {
  return urlLib.parse(url).pathname
}

const getRoute = (routes, pathname) => {
  return routes.find(route => matchPath(pathname, route));
};

const getData = (route) => {
  return route.getInitialData();
};

const getInitialData = (url, routes) => {
  const pathname = getPathname(url);
  const route = getRoute(routes, pathname);
  const data = getData(route);
  return data;
};

export default getInitialData;

import { matchPath } from 'react-router-dom';
import * as urlLib from 'url';

const getPathname = url => {
  return urlLib.parse(url).pathname;
};

const getRoute = (routes, pathname) => {
  return routes.find(route => matchPath(pathname, route));
};

const getInitialProps = (url, routes, req = {}) => {
  const pathname = getPathname(url);
  const route = getRoute(routes, pathname);

  return route.getInitialProps(req);
};

export default getInitialProps;

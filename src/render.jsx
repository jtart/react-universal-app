import getRouteAndMatch from './getRouteAndMatch.js';
import loadInitialProps from './loadInitialProps.js';
import renderApp from './renderApp.jsx';
import createDocument from './createDocument.js';

export default async function(url, routes, scripts, withWrapper = null) {
  const { route, match } = getRouteAndMatch(url, routes);

  if (!route) {
    return { statusCode: 404, html: null };
  }

  const data = await loadInitialProps(route, { match });

  const { appHTML, additionalHeadElements } = await renderApp(
    url,
    routes,
    data,
    withWrapper,
  );

  const html = createDocument(appHTML, data, scripts, additionalHeadElements);

  return { statusCode: 200, html };
}

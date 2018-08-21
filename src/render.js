import getRouteAndMatch from './getRouteAndMatch.js';
import loadInitialProps from './loadInitialProps.js';
import renderApp from './renderApp.jsx';
import createDocument from './createDocument.js';

export default async function(url, routes, scripts, withWrapper = null) {
  const { route, match } = getRouteAndMatch(url, routes);

  if (!route) {
    return { statusCode: 404, html: null };
  }

  let data = null;
  let renderedApp;
  try {
    data = await loadInitialProps(route, { match });
    renderedApp = await renderApp(url, routes, data, withWrapper);
  } catch (error) {
    return { statusCode: 500, error };
  }

  const html = createDocument(
    renderedApp.appHTML,
    data,
    scripts,
    renderedApp.additionalHeadElements,
  );

  return { statusCode: 200, html };
}

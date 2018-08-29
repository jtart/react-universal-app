import getRouteAndMatch from './getRouteAndMatch.js';
import loadInitialData from './loadInitialData.js';
import renderApp from './renderApp.jsx';
import createDocument from './createDocument.js';

export default async function(url, routes, scripts, withWrapper = null) {
  const { route, match } = getRouteAndMatch(url, routes);

  if (!route) {
    throw new Error(`No route was found for ${url}.`);
  }

  let data = null;
  let app;
  try {
    data = await loadInitialData(route, { match });
    app = await renderApp(url, routes, data, withWrapper);
  } catch (error) {
    throw error;
  }

  const html = createDocument(app, data, scripts);

  return { statusCode: 200, html };
}

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import getRouteAndMatch from './getRouteAndMatch.js';
import loadInitialProps from './loadInitialProps.js';

import App from './App.jsx';
import createDocument from './createDocument.js';

async function renderApp(url, routes, data, withWrapper) {
  const appHTML = renderToString(
    await withWrapper.call(
      this,
      <StaticRouter location={url} context={{}}>
        <App initialData={data} routes={routes} />
      </StaticRouter>,
    ),
  );

  const additionalHeadElements = [];

  if (Object.hasOwnProperty.call(withWrapper, 'getAdditionalHeadElements')) {
    const wrapperElements = withWrapper.getAdditionalHeadElements.call(this);

    additionalHeadElements.push(...wrapperElements);
  }

  return { appHTML, additionalHeadElements };
}

async function render(url, routes, scripts, withWrapper = async App => App) {
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

export default render;

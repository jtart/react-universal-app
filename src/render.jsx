import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import getRouteAndMatch from './getRouteAndMatch.js';
import loadInitialProps from './loadInitialProps.js';

import App from './App.jsx';
import Document from './Document.jsx';

async function renderApp(url, routes, data, error, withWrapper) {
  let app;

  try {
    app = await withWrapper.call(
      this,
      <StaticRouter location={url} context={{}}>
        <App initialData={data} error={error} routes={routes} />
      </StaticRouter>,
    );
  } catch (error) {
    return { error };
  }

  const appHTML = renderToString(app);

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
    return { statusCode: 404 };
  }

  let data = null;
  let error = null;
  try {
    data = await loadInitialProps(route, { match });
  } catch (error) {
    error = error;
  }

  const renderedApp = await renderApp(url, routes, data, error, withWrapper);

  if (renderedApp.error) {
    return { statusCode: 500, error: renderedApp.error };
  }

  const html = renderToStaticMarkup(
    <Document {...renderedApp} data={data} scripts={scripts} />,
  );

  return { statusCode: 200, html };
}

export default render;

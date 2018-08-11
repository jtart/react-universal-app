import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import defaultWithWrapper from './defaultWithWrapper.js';
import getRouteAndMatch from './getRouteAndMatch.js';
import loadInitialProps from './loadInitialProps.js';

import App from './App.jsx';
import Document from './Document.jsx';

async function renderApp(url, routes, data, withWrapper) {
  const html = renderToString(
    await withWrapper.call(
      this,
      <StaticRouter location={url} context={{}}>
        <App initialData={data} routes={routes} />
      </StaticRouter>,
    ),
  );

  const additional = [];

  if (Object.hasOwnProperty.call(withWrapper, 'getTags')) {
    const wrapperTags = withWrapper.getTags.call(this);

    additional.push(...wrapperTags);
  }

  return { html, additional, data };
}

async function render(url, routes, scripts, withWrapper = defaultWithWrapper) {
  const { route, match } = getRouteAndMatch(url, routes);

  if (!route) {
    return { statusCode: 404, html: null };
  }

  const data = await loadInitialProps(route, { match });

  const appProps = await renderApp(url, routes, data, withWrapper);

  const html = renderToStaticMarkup(
    <Document scripts={scripts} {...appProps} />,
  );

  return { statusCode: 200, html };
}

export default render;

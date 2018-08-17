import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import defaultWithWrapper from './defaultWithWrapper.js';
import getRouteAndMatch from './getRouteAndMatch.js';
import loadInitialProps from './loadInitialProps.js';

import App from './App.jsx';
import Document from './Document.jsx';

async function renderApp(url, routes, data, withWrapper) {
  const appHTML = renderToString(
    await withWrapper.call(
      this,
      <StaticRouter location={url} context={{}}>
        <App initialData={data} routes={routes} />
      </StaticRouter>,
    ),
  );

  const additionalHeadProps = [];

  if (Object.hasOwnProperty.call(withWrapper, 'getAdditionalHeadProps')) {
    const wrapperTags = withWrapper.getAdditionalHeadProps.call(this);

    additionalHeadProps.push(...wrapperTags);
  }

  return { appHTML, additionalHeadProps };
}

async function render(url, routes, scripts, withWrapper = defaultWithWrapper) {
  const { route, match } = getRouteAndMatch(url, routes);

  if (!route) {
    return { statusCode: 404, html: null };
  }

  const data = await loadInitialProps(route, { match });

  const { appHTML, additionalHeadProps } = await renderApp(
    url,
    routes,
    data,
    withWrapper,
  );

  const html = renderToStaticMarkup(
    <Document
      additionalHeadProps={additionalHeadProps}
      appHTML={appHTML}
      data={data}
      scripts={scripts}
    />,
  );

  return { statusCode: 200, html };
}

export default render;

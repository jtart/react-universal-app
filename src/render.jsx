import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import getRouteAndMatch from './getRouteAndMatch.js';
import loadInitialProps from './loadInitialProps.js';

import App from './App.jsx';
import defaultDoc from './Document.jsx';

const renderApp = (url, routes, data) => {
  const sheet = new ServerStyleSheet();

  const html = renderToString(
    <StaticRouter location={url} context={{}}>
      <StyleSheetManager sheet={sheet.instance}>
        <App routes={routes} initialData={data} />
      </StyleSheetManager>
    </StaticRouter>,
  );

  const styles = sheet.getStyleElement();
  const helmet = Helmet.renderStatic();

  return { html, styles, helmet };
};

const render = async (req, routes, scripts, Document = defaultDoc) => {
  const { url } = req;

  const { route, match } = getRouteAndMatch(url, routes);

  if (!route) {
    return { statusCode: 404, html: null };
  }

  const data = await loadInitialProps(route, { match, req });

  const appProps = renderApp(url, routes, data);

  const doc = <Document scripts={scripts} data={data} {...appProps} />;

  const html = renderToStaticMarkup(doc);

  return { statusCode: 200, html };
};

export default render;

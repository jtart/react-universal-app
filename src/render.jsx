import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import getRouteAndMatch from './getRouteAndMatch.js';
import loadInitialProps from './loadInitialProps.js';

import App from './App.jsx';
import defaultDoc from './Document.jsx';

const renderApp = (req, routes, match) => {
  const data = await loadInitialProps(route, { match, req });

  const sheet = new ServerStyleSheet();

  const html = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <StyleSheetManager sheet={sheet.instance}>
        <App routes={routes} initialData={data} />
      </StyleSheetManager>
    </StaticRouter>,
  );

  const styles = sheet.getStyleElement();
  const helmet = Helmet.renderStatic();

  const head = {
    attributes: {
      html: helmet.htmlAttributes.toComponent();
      body: helmet.bodyAttributes.toComponent();
    },
    tags: [
      helmet.title.toComponent(),
      helmet.meta.toComponent(),
      helmet.link.toComponent(),
    ],
  };

  return { html, styles, head, data };
};

const render = async (req, routes, scripts, Document = defaultDoc) => {
  const { route, match } = getRouteAndMatch(req.url, routes);

  if (!route) {
    return { statusCode: 404, html: null };
  }

  const appProps = renderApp(req, routes, match);

  const doc = <Document scripts={scripts} {...appProps} />;

  const html = renderToStaticMarkup(doc);

  return { statusCode: 200, html };
};

export default render;

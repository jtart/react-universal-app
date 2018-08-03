import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import getInitialProps from './getInitialProps.js';
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

const render = (req, routes, assets, Document = defaultDoc) => {
  const { url } = req;

  const data = getInitialProps(url, routes, req);
  const pageProps = renderApp(url, routes, data);

  const doc = <Document assets={assets} data={data} {...pageProps} />;

  const renderedDoc = renderToStaticMarkup(doc);

  return renderedDoc;
};

export default render;

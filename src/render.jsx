import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import getInitialProps from './getInitialProps.js';
import App from './App.jsx';
import defaultDoc from './Document.jsx';

const renderPage = (url, routes, data) => {
  const sheet = new ServerStyleSheet();

  const html = renderToString(
    <StaticRouter location={url} context={{}}>
      <StyleSheetManager sheet={sheet.instance}>
        <App routes={routes} initialData={data} />
      </StyleSheetManager>
    </StaticRouter>,
  );

  const styles = sheet.getStyleElement();

  return { html, styles };
};

const render = (req, routes, assets, Document = defaultDoc) => {
  const { url } = req;
  const data = getInitialProps(url, routes, req);

  const { html, styles } = renderPage(url, routes, data);
  const helmet = Helmet.renderStatic();

  const doc = (
    <Document
      assets={assets}
      html={html}
      data={data}
      helmet={helmet}
      styles={styles}
    />
  );

  const renderedDoc = renderToStaticMarkup(doc);

  return renderedDoc;
};

export default renderPage;

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

import getInitialProps from './getInitialProps.js';
import App from './App.jsx';
import defaultDoc from './Document.jsx';

const renderContent = (url, routes, data) => {
  const sheet = new ServerStyleSheet();

  const content = renderToString(
    <StaticRouter location={url} context={{}}>
      <StyleSheetManager sheet={sheet.instance}>
        <App routes={routes} data={data} />
      </StyleSheetManager>
    </StaticRouter>,
  );

  const styles = sheet.getStyleElement();

  return { content, styles };
};

const renderPage = (req, routes, assets, Document = defaultDoc) => {
  const { url } = req;
  const data = getInitialProps(url, routes, req);

  const { content, styles } = renderContent(url, routes, data);
  const helmet = Helmet.renderStatic();

  const doc = (
    <Document
      assets={assets}
      content={content}
      data={data}
      helmet={helmet}
      styles={styles}
    />
  );

  const html = renderToStaticMarkup(doc);

  return html;
};

export default renderPage;

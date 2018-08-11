import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import defaultWithWrapper from './defaultWithWrapper.js';
import getRouteAndMatch from './getRouteAndMatch.js';
import loadInitialProps from './loadInitialProps.js';

import App from './App.jsx';
import Document from './Document.jsx';

const renderMeta = () => {
  const {
    htmlAttributes,
    bodyAttributes,
    title,
    meta,
    link,
  } = Helmet.renderStatic();

  return {
    attributes: {
      html: htmlAttributes.toComponent(),
      body: bodyAttributes.toComponent(),
    },
    tags: {
      title: title.toComponent(),
      meta: meta.toComponent(),
      links: link.toComponent(),
      additional: []
    },
  };
};

async function renderApp(url, routes, data, withWrapper) {
  const html = renderToString(
    await withWrapper.call(
      this,
      <StaticRouter location={url} context={{}}>
        <App initialData={data} routes={routes} />
      </StaticRouter>,
    ),
  );

  const meta = renderMeta();

  if (Object.hasOwnProperty.call(withWrapper, 'getTags')) {
    const wrapperTags = withWrapper.getTags.call(this);

    meta.tags.additional.push(...wrapperTags);
  }

  return { html, meta, meta, data };
}

async function render(url, routes, scripts, withWrapper = defaultWithWrapper) {
  const { route, match } = getRouteAndMatch(url, routes);

  if (!route) {
    return { statusCode: 404, html: null };
  }

  const data = await loadInitialProps(route, { match });

  const appProps = await renderApp(url, routes, data, withWrapper);

  const doc = <Document scripts={scripts} {...appProps} />;

  const html = renderToStaticMarkup(doc);

  return { statusCode: 200, html };
}

export default render;

import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import getRouteAndMatch from './getRouteAndMatch.js';
import loadInitialProps from './loadInitialProps.js';

import App from './App.jsx';
import Document from './Document.jsx';

const defaultWithWrapper = props => App => <App {...props} />;

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
    tags: [title.toComponent(), meta.toComponent(), link.toComponent()],
  };
};

function renderApp(url, routes, data, withWrapper) {
  const html = renderToString(
    <StaticRouter location={url} context={{}}>
      {withWrapper.call(this, <App initialData={data} routes={routes} />)}
    </StaticRouter>,
  );

  const meta = renderMeta();

  if (Object.hasOwnProperty.call(withWrapper, 'getTags')) {
    const wrapperTags = withWrapper.getTags.call(this);

    meta.tags = [...meta.tags, ...wrapperTags];
  }

  return { html, meta, meta, data };
}

async function render(req, routes, scripts, withWrapper = defaultWithWrapper) {
  const { route, match } = getRouteAndMatch(req.url, routes);

  if (!route) {
    return { statusCode: 404, html: null };
  }

  const data = await loadInitialProps(route, { match, req });

  const appProps = renderApp(req.url, routes, data, withWrapper);

  const doc = <Document scripts={scripts} {...appProps} />;

  const html = renderToStaticMarkup(doc);

  return { statusCode: 200, html };
}

export default render;

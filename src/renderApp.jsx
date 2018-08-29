import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';

export default async function(
  url,
  routes,
  data,
  withWrapper = async App => App,
) {
  let app;

  const helmetContext = {};

  try {
    app = await withWrapper.call(
      this,
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url} context={{}}>
          <App initialData={data} routes={routes} />
        </StaticRouter>
      </HelmetProvider>,
    );
  } catch (error) {
    throw error;
  }

  const appHTML = renderToString(app);

  if (
    typeof appHTML === 'undefined' ||
    appHTML === null ||
    appHTML.length === 0
  ) {
    throw new Error(`No HTML rendered for ${url}.`);
  }

  const { helmet } = helmetContext;

  const additionalHeadElements = [];

  if (Object.hasOwnProperty.call(withWrapper, 'getAdditionalHeadElements')) {
    const wrapperElements = withWrapper.getAdditionalHeadElements.call(this);

    additionalHeadElements.push(...wrapperElements);
  }

  return { appHTML, additionalHeadElements, helmet };
}

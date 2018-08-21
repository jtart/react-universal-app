import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';

export default async function(
  url,
  routes,
  data,
  withWrapper = async App => App,
) {
  const appHTML = renderToString(
    await withWrapper.call(
      this,
      <StaticRouter location={url} context={{}}>
        <App initialData={data} routes={routes} />
      </StaticRouter>,
    ),
  );

  const additionalHeadElements = [];

  if (Object.hasOwnProperty.call(withWrapper, 'getAdditionalHeadElements')) {
    const wrapperElements = withWrapper.getAdditionalHeadElements.call(this);

    additionalHeadElements.push(...wrapperElements);
  }

  return { appHTML, additionalHeadElements };
}

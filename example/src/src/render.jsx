import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import getInitialData from './getInitialData';
import App from './App';
import Document from './Document';

const renderContent = (url, routes, data) => {
  const content = renderToString(
    <StaticRouter location={url} context={{}}>
      <App routes={routes} data={data}/>
    </StaticRouter>
  );

  return content;
};

export const renderPage = ({url}, routes) => {
  const data = getInitialData(url, routes);
  const content = renderContent(url, routes, data);

  const html = renderToStaticMarkup(<Document content={content} />);

  return html;
};

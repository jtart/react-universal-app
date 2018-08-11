import React from 'react';
import Helmet from 'react-helmet';

import ServerData from './ServerData.jsx';
import { Scripts, Root } from './Root.jsx';

const Document = ({ additional, html, data, scripts }) => {
  const helmet = Helmet.renderStatic();

  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {additional}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        <Root html={html} />
        <ServerData id="__UNI_DATA__" data={data} />
        <Scripts scripts={scripts} />
      </body>
    </html>
  );
};

export default Document;

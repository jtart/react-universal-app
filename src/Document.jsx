import React from 'react';
import Helmet from 'react-helmet';

import ServerData from './ServerData.jsx';
import { Scripts, Root } from './Root.jsx';

const Document = ({ additionalHeadElements, appHTML, data, scripts }) => {
  const helmet = Helmet.renderStatic();

  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {additionalHeadElements}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        <Root html={appHTML} />
        <ServerData id="__UNI_DATA__" data={data} />
        <Scripts scripts={scripts} />
      </body>
    </html>
  );
};

export default Document;

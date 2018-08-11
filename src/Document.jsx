import React from 'react';
import ServerData from './ServerData.jsx';
import { Scripts, Root } from './Root.jsx';

const Document = ({ meta, html, data, scripts }) => {
  const { attributes, tags } = meta;

  return (
    <html {...attributes.html}>
      <head>
        <React.Fragment>
          {tags.title}
          {tags.meta}
          {tags.links}
          {tags.additional}
        </React.Fragment>
      </head>
      <body {...attributes.body}>
        <Root html={html} />
        <ServerData id="__UNI_DATA__" data={data} />
        <Scripts scripts={scripts} />
      </body>
    </html>
  );
};

export default Document;

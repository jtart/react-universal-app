import React from 'react';
import { ServerData, Scripts, Root } from './Root.jsx';

const Document = ({ head, html, data, scripts }) => {
  const { attributes, tags } = head;

  return (
    <html {...attributes.html}>
      <head>{tags}</head>
      <body {...attributes.body}>
        <Root html={html} />
        <ServerData data={data} />
        <Scripts scripts={scripts} />
      </body>
    </html>
  );
};

export default Document;

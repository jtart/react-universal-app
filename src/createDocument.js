const createDocument = (
  { appHTML, additionalHeadElements, helmet },
  data,
  scripts,
) => {
  const serialisedData = JSON.stringify(data).replace(/</g, '\\u003c');

  return `
    <!DOCTYPE html>
    <html>
      <head ${helmet.htmlAttributes.toString()}>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${additionalHeadElements.join('')}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="__uni__">${appHTML}</div>
        <script>window.__UNI_DATA__ = ${serialisedData}</script>
        ${scripts
          .map(script => `<script src="${script}" defer></script>`)
          .join('')}
      </body>
    </html>
  `;
};

export default createDocument;

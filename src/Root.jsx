import React from 'react';

export const ServerData = ({ data }) => {
  const serialisedProps = JSON.stringify(data).replace(/\//g, '\\/');

  return (
    <script
      id="server-data"
      type="application/json"
      dangerouslySetInnerHTML={{
        __html: serialisedProps,
      }}
    />
  );
};

export const Scripts = ({ scripts }) =>
  scripts.map(script => <script src={script} defer />);

export const Root = ({ html }) => (
  <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
);

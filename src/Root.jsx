import React from 'react';

export const ServerData = ({ data }) => {
  const serialisedProps = JSON.stringify(data).replace(/\//g, '\\/');

  return (
    <script
      id="uni-data"
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
  <div id="__uni__" dangerouslySetInnerHTML={{ __html: html }} />
);

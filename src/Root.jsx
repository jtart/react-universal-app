import React, { Fragment } from 'react';

const ServerData = ({ data }) => {
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

const Scripts = ({ assets }) =>
  Object.keys(assets).map(key => (
    <script key={key} src={`${assets[key].js}`} defer />
  ));

const Root = ({ html, data, assets }) => (
  <Fragment>
    <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
    <ServerData data={data} />
    <Scripts assets={assets} />
  </Fragment>
);

export default Root;

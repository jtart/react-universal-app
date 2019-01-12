import React from 'react';
import Helmet from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Index = ({ loading, error, data }) => {
  if (loading) return 'Loading!';
  if (error) return 'Error!';
  if (data) {
    return (
      <div>
        <Helmet>
          <html lang="en-GB" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Page description" />
          {data.title ? <title>{data.title}</title> : null}
        </Helmet>
        <h1>{data.title ? data.title : 'Loading...'}</h1>
        <ul>
          {data.link ? (
            <li>
              <Link to={data.link.to}>{data.link.text} page</Link>
            </li>
          ) : null}
        </ul>
      </div>
    );
  }
};

export default Index;

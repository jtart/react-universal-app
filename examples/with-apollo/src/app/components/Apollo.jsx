import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from '@jtart/uni';

const Apollo = () => (
  <div>
    <h1>GraphQL w/ Apollo</h1>
    <Link to="/">Home</Link>
    <Query
      query={gql`
        {
          allPosts(count: 5) {
            id
            title
            body
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return (
          <ul>
            {data.allPosts.map(({ id, title, body }) => (
              <li key={id}>
                <h2>{title}</h2>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        );
      }}
    </Query>
  </div>
);

export default Apollo;

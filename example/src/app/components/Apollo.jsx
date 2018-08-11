import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

const Apollo = () => (
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

      return data.allPosts.map(({ id, title, body }) => (
        <div key={id}>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      ));
    }}
  </Query>
);

export default Apollo;

import React from 'react';
import { Link } from 'react-router-dom';

const Index = ({ loading, error, data }) => {
  if (loading) return 'Loading!';
  if (error) return 'Error!';
  if (data) {
    return (
      <div>
        <h1>{data.title}</h1>
        <Link to={data.link.to}>{data.link.text} page</Link>
      </div>
    );
  }
};

export default Index;

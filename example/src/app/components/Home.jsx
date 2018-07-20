import React from 'react';

class Home extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <h1>Welcome!</h1>
        <p>{data}</p>
      </div>
    );
  }
}

export default Home;

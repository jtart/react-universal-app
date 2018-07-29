import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

import getInitialProps from './getInitialProps.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { ...props };
  }

  static getDerivedStateFromProps({ routes, location }, prevState) {
    const navigated = location !== prevState.location;

    if (navigated) {
      const { pathname } = location;

      const data = getInitialProps(pathname, routes);

      return { data, location };
    }

    return { ...prevState };
  }

  render() {
    const { data } = this.state;
    const { routes } = this.props;

    return renderRoutes(routes, { ...data });
  }
}

export default withRouter(App);

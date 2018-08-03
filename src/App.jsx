import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

import getInitialProps from './getInitialProps.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { data: this.props.initialData };
  }

  componentDidUpdate({ location: prevLocation }) {
    const { location, routes } = this.props;
    const navigated = location !== prevLocation;

    if (navigated) {
      const { pathname } = location;

      const data = getInitialProps(pathname, routes);

      this.setState({ data });
    }
  }

  render() {
    const { data } = this.state;
    const { routes } = this.props;

    return renderRoutes(routes, { ...data });
  }
}

export default withRouter(App);

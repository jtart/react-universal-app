import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

import getRouteAndMatch from './getRouteAndMatch.js';
import loadInitialProps from './loadInitialProps.js';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = { data: this.props.initialData };
  }

  async componentDidUpdate({ location: prevLocation }) {
    if (this.props.location.pathname !== prevLocation.pathname) {
      const { route, match } = getRouteAndMatch(
        this.props.location.pathname,
        this.props.routes,
      );

      const data = await loadInitialProps(route, { match });

      this.setState({ data });
    }
  }

  render() {
    return renderRoutes(this.props.routes, { ...this.state.data });
  }
}

export default withRouter(App);

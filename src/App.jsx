import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

import getRouteAndMatch from './getRouteAndMatch.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { data: this.props.initialData };
  }

  async componentDidUpdate({ location: prevLocation }) {
    const { location } = this.props;
    const navigated = location !== prevLocation;

    if (navigated) {
      const { routes } = this.props;
      const { pathname } = location;

      const { route, match } = getRouteAndMatch(pathname, routes);

      const data = await route.getInitialProps({ match });

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

import { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

import getRouteAndMatch from './getRouteAndMatch.js';
import loadInitialData from './loadInitialData.js';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.initialData,
      loading: false,
      error: null,
      loadInitialDataPromise: null,
    };
  }

  async componentDidUpdate({ location: prevLocation }) {
    if (this.props.location.pathname !== prevLocation.pathname) {
      const { route, match } = getRouteAndMatch(
        this.props.location.pathname,
        this.props.routes,
      );

      if (route) {
        this.setState({
          data: null,
          loading: true,
          error: null,
          loadInitialDataPromise: loadInitialData(route, {
            match,
          }),
        });
      }
    }

    if (this.state.loading) {
      try {
        const data = await this.state.loadInitialDataPromise;
        this.setState({
          data,
          loading: false,
          error: null,
          loadInitialDataPromise: null,
        });
      } catch (error) {
        this.setState({
          loading: false,
          error: error,
          loadInitialDataPromise: null,
        });
      }
    }
  }

  render() {
    return renderRoutes(this.props.routes, {
      data: this.state.data,
      loading: this.state.loading,
      error: this.state.error,
    });
  }
}

export default withRouter(App);

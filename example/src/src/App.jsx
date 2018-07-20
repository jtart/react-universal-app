import React from 'react';
import { renderRoutes } from 'react-router-config';
import getInitialData from './getInitialData';

class App extends React.PureComponent {
  state = {
    data: this.props.data,
  };

  componentWillReceiveProps(nextProps: any, nextState: any) {
    const navigated = nextProps.location !== this.props.location;
  
    if (navigated) {
      const { routes, location } = nextProps;
      const data = getInitialData(routes, location.pathname);
      this.setState({ data });
    }
  };

  render() {
    const { data } = this.state;
    return renderRoutes(this.props.routes, { data });
  };
}

export default App;
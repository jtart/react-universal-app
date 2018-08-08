const loadInitialProps = async (route, ctx) =>
  Object.prototype.hasOwnProperty(route, 'getInitialProps')
    ? await route.getInitialProps(ctx)
    : {};

export default loadInitialProps;

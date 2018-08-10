const loadInitialProps = async (route, ctx) =>
  route.getInitialProps ? await route.getInitialProps(ctx) : {};

export default loadInitialProps;

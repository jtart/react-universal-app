const loadInitialProps = async (route, ctx) => {
  if (!Object.prototype.hasOwnProperty(route, 'getInitialProps')) {
    return {};
  }

  return await route.getInitialProps(ctx);
};

export default loadInitialProps;

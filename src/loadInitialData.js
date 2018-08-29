const loadInitialData = async (route, ctx) => {
  if (!route.getInitialData) {
    return {};
  }

  try {
    return await route.getInitialData(ctx);
  } catch (error) {
    throw error;
  }
};

export default loadInitialData;

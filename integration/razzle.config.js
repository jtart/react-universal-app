module.exports = {
  modify: config => {
    const appConfig = { ...config };

    // Disable bundle size hint for integration
    if (process.env.CI) {
      appConfig.performance = {
        hints: false,
      };
    }

    return appConfig;
  },
};

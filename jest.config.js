module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['lcov'],
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/'],
  testURL: 'http://localhost/',
  transformIgnorePatterns: ['/node_modules/'],
  verbose: true,
};

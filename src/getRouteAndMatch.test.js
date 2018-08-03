import getRouteAndMatch from './getRouteAndMatch';

const mockMatch = { match: 'yay!' };

jest.mock('react-router-dom', () => ({
  matchPath: jest
    .fn()
    .mockImplementation((url, route) => (url === route ? mockMatch : false)),
}));

const getRouteAndMatchTest = (mockURL, expectedResult) => {
  expect(getRouteAndMatch(mockURL, ['urlOne', 'urlTwo', 'urlThree'])).toEqual(
    expectedResult,
  );
};

describe('getRouteAndMatch', () => {
  describe('matched route', () => {
    it('should return an object containing route and match', () => {
      const mockURL = 'urlTwo';

      const expectedResult = { match: mockMatch, route: mockURL };

      getRouteAndMatchTest(mockURL, expectedResult);
    });
  });

  describe('no matched route', () => {
    it('should return an empty object', () => {
      const expectedResult = {};

      getRouteAndMatchTest('urlFour', expectedResult);
    });
  });
});

import getRouteAndMatch from './getRouteAndMatch';
import * as reactRouterConfig from 'react-router-config';

const getRouteAndMatchTest = (mockURL, expectedResult) => {
  expect(getRouteAndMatch(mockURL, ['urlOne', 'urlTwo', 'urlThree'])).toEqual(
    expectedResult,
  );
};

describe('getRouteAndMatch', () => {
  describe('matched route', () => {
    it('should return first returned item', () => {
      const match = { match: true };
      reactRouterConfig.matchRoutes = jest
        .fn()
        .mockReturnValue([match, { match: false }]);

      getRouteAndMatchTest('urlTwo', { match: true });
    });
  });

  describe('no matched route', () => {
    it('should return an empty object', () => {
      reactRouterConfig.matchRoutes = jest.fn().mockReturnValue([]);

      getRouteAndMatchTest('urlFour', {});
    });
  });
});

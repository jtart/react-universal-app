import loadInitialData from './loadInitialData';

describe('loadInitialData', () => {
  describe('no getInitialData function on route', () => {
    it('should return an empty object', async () => {
      const initialData = await loadInitialData({}, {});

      expect(initialData).toEqual({});
    });
  });

  describe('getInitialData function on route', () => {
    it('should call getInitialData with passed ctx and return value', async () => {
      const route = {
        getInitialData: jest
          .fn()
          .mockImplementation(() => Promise.resolve('Some data!')),
      };

      const initialData = await loadInitialData(route, {});

      expect(route.getInitialData).toHaveBeenCalledTimes(1);
      expect(initialData).toEqual('Some data!');
    });

    describe('error on getInitialData call', () => {
      it('should throw an error', async () => {
        const route = {
          getInitialData: jest
            .fn()
            .mockImplementation(() => Promise.reject('Error!')),
        };

        try {
          await loadInitialData(route, {});
        } catch (error) {
          expect(error).toEqual('Error!');
        }

        expect(route.getInitialData).toHaveBeenCalledTimes(1);
      });
    });
  });
});

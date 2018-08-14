import defaultWithWrapper from './defaultWithWrapper';

describe('defaultWithWrapper', () => {
  it('should return passed argument', () => {
    const arg = 'Data';

    const wrapper = defaultWithWrapper(arg);

    expect(wrapper).toEqual(arg);
  });
});

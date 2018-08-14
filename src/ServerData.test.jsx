import React from 'react';
import ServerData from './ServerData';

describe('ServerData', () => {
  it('should a render script with serialised props', () => {
    const wrapper = shallow(
      <ServerData
        id="idOne"
        data={{ data: { entry: 'This is some data!' } }}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});

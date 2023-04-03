import React from 'react';
import { shallow } from 'enzyme';
import StatusIkon from './StatusIkon';

test('Test that <StatusIkon> renders correctly', () => {
    const wrapper = shallow(<StatusIkon status={'PÅBEGYNT'} />);
    expect(wrapper).toHaveLength(1);
});

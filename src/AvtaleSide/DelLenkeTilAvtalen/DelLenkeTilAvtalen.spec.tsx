import React from 'react';
import { shallow } from 'enzyme';
import DelLenkeTilAvtalen from './DelLenkeTilAvtalen';

test('Test that <DelLenkeTilAvtalen> renders correctly', () => {
    const wrapper = shallow(<DelLenkeTilAvtalen />);
    expect(wrapper).toHaveLength(1);
});

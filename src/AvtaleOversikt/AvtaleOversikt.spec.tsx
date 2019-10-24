
import React from 'react';
import { shallow } from 'enzyme';
import AvtaleOversikt from './AvtaleOversikt';

test('Test that <AvtaleOversikt> renders correctly', () => {
    const wrapper = shallow(<AvtaleOversikt/>);
    expect(wrapper).toHaveLength(1);
});

import React from 'react';
import { shallow } from 'enzyme';
import StegmenyLenke from './StegmenyLenke';

test('Test that <StegmenyLenke> renders correctly', () => {
    const wrapper = shallow(<StegmenyLenke/>);
    expect(wrapper).toHaveLength(1);
});
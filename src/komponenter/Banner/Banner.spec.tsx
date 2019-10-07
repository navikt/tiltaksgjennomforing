
import React from 'react';
import { shallow } from 'enzyme';
import Banner from './Banner';

test('Test that <Banner> renders correctly', () => {
    const wrapper = shallow(<Banner/>);
    expect(wrapper).toHaveLength(1);
});
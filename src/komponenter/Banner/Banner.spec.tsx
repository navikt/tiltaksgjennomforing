import React from 'react';
import { shallow } from 'enzyme';
import Banner from './Banner';

test('Test that <Banner> renders correctly', () => {
    const wrapper = shallow(<Banner tekst="nav.no" />);
    expect(wrapper).toHaveLength(1);
});

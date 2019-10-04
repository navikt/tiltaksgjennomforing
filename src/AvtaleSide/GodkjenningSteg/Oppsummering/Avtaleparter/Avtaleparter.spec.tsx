
import React from 'react';
import { shallow } from 'enzyme';
import Avtaleparter from './Avtaleparter';

test('Test that <Avtaleparter> renders correctly', () => {
    const wrapper = shallow(<Avtaleparter/>);
    expect(wrapper).toHaveLength(1);
});
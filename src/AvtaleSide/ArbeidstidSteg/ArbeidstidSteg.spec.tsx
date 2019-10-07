
import React from 'react';
import { shallow } from 'enzyme';
import ArbeidstidSteg from './ArbeidstidSteg';

test('Test that <ArbeidstidSteg> renders correctly', () => {
    const wrapper = shallow(<ArbeidstidSteg/>);
    expect(wrapper).toHaveLength(1);
});

import React from 'react';
import { shallow } from 'enzyme';
import ArbeidsoppgaverSteg from './ArbeidsoppgaverSteg';

test('Test that <ArbeidsoppgaverSteg> renders correctly', () => {
    const wrapper = shallow(<ArbeidsoppgaverSteg/>);
    expect(wrapper).toHaveLength(1);
});
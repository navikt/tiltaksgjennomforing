
import React from 'react';
import { shallow } from 'enzyme';
import OppfolgingOppsummering from './OppfolgingOppsummering';

test('Test that <OppfolgingOppsummering> renders correctly', () => {
    const wrapper = shallow(<OppfolgingOppsummering/>);
    expect(wrapper).toHaveLength(1);
});
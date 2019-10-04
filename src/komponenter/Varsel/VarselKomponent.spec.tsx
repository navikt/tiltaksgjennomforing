
import React from 'react';
import { shallow } from 'enzyme';
import VarselKomponent from './VarselKomponent';

test('Test that <VarselKomponent> renders correctly', () => {
    const wrapper = shallow(<VarselKomponent type="info"/>);
    expect(wrapper).toHaveLength(1);
});

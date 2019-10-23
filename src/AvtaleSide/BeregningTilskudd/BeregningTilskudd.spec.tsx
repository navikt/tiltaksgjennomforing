import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { shallow } from 'enzyme';
import React from 'react';
import BeregningTilskudd from './BeregningTilskudd';

test('Test at <BeregningTilskudd> rendres', () => {
    const wrapper = shallow(<BeregningTilskudd />);
    expect(wrapper).toHaveLength(1);
});

test('Skal rendre Innholdsboks', () => {
    const wrapper = shallow(<BeregningTilskudd />);
    expect(wrapper.find(Innholdsboks)).toHaveLength(1);
});

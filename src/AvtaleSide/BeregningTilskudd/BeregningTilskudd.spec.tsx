import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { shallow } from 'enzyme';
import React from 'react';
import BeregningTilskudd from './BeregningTilskudd';

test('Test that <GodkjenningSteg> renders correctly', () => {
    const wrapper = shallow(<BeregningTilskudd />);
    expect(wrapper).toHaveLength(1);
});

test('should render innholdsboks', () => {
    const wrapper = shallow(<BeregningTilskudd />);
    expect(wrapper.find(Innholdsboks)).toHaveLength(1);
});

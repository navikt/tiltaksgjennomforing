import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { shallow } from 'enzyme';
import React from 'react';
import LonnstilskuddVarighet from './LonnstilskuddVarighet';

test('Test at <LonnstilskuddVarighet> rendres', () => {
    const wrapper = shallow(<LonnstilskuddVarighet />);
    expect(wrapper).toHaveLength(1);
});

test('should render innholdsboks', () => {
    const wrapper = shallow(<LonnstilskuddVarighet />);
    expect(wrapper.find(Innholdsboks)).toHaveLength(1);
});

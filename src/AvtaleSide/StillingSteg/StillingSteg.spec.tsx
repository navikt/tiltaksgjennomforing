import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { shallow } from 'enzyme';
import React from 'react';
import StillingSteg from './StillingSteg';

test('Test ar <StillingSteg> rendres', () => {
    const wrapper = shallow(<StillingSteg />);
    expect(wrapper).toHaveLength(1);
});

test('should render innholdsboks', () => {
    const wrapper = shallow(<StillingSteg />);
    expect(wrapper.find(Innholdsboks)).toHaveLength(1);
});

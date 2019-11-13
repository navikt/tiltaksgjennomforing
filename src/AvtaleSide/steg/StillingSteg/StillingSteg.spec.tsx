import React from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { mount, shallow } from 'enzyme';
import StillingSteg from './StillingSteg';
import avtaleMock from '@/mocking/avtale-mock';

test('Test ar <StillingSteg> rendres correctly', () => {
    const wrapper = mount(
        <StillingSteg avtale={avtaleMock} settAvtaleVerdi={() => {}} lagreAvtale={() => Promise.resolve()} />
    );
    expect(wrapper).toHaveLength(1);
    const innholdsBoks = wrapper.find(Innholdsboks);

    expect(innholdsBoks).toHaveLength(1);
});

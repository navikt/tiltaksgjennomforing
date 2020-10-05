import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { AvtaleContext, Context } from '@/NyAvtaleProvider';
import { mount } from 'enzyme';
import React from 'react';
import StillingSteg from './StillingSteg';

test('Test ar <StillingSteg> rendres correctly', () => {
    const wrapper = mount(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <StillingSteg />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
    const innholdsBoks = wrapper.find(Innholdsboks);

    expect(innholdsBoks).toHaveLength(1);
});

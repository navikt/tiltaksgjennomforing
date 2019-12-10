import { mount } from 'enzyme';
import React from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import BeregningTilskuddSteg from './BeregningTilskuddSteg';
import lonnstilskuddAvtaleMock from '@/mocking/lonnstilskudd-avtale-mock';

test('Test at <BeregningTilskudd> rendres', () => {
    const wrapper = mount(
        <BeregningTilskuddSteg
            avtale={lonnstilskuddAvtaleMock}
            settAvtaleVerdi={() => {}}
            lagreAvtale={() => Promise.resolve()}
        />
    );
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(Innholdsboks)).toHaveLength(1);
});

import { mount } from 'enzyme';
import React from 'react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import BeregningTilskuddSteg from './BeregningTilskuddSteg';
import avtaleMock from '@/mocking/avtale-mock';

test('Test at <BeregningTilskudd> rendres', () => {
    const wrapper = mount(
        <BeregningTilskuddSteg avtale={avtaleMock} settAvtaleVerdi={() => {}} lagreAvtale={() => Promise.resolve()} />
    );
    expect(wrapper).toHaveLength(1);
    expect(wrapper.find(Innholdsboks)).toHaveLength(1);
});

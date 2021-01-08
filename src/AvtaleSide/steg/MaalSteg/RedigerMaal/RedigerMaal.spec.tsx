import React from 'react';
import RedigerMaal from './RedigerMaal';
import { shallow } from 'enzyme';
import { Maalkategori } from '@/types/maalkategorier';

test('Test that <RedigerMaal> renders correctly', () => {
    const ledigeMaalKategorier = [
        'FÅ_JOBB_I_BEDRIFTEN',
        'ARBEIDSERFARING',
        'UTPRØVING',
        'SPRÅKOPPLÆRING',
        'OPPNÅ_FAGBREV_KOMPETANSEBEVIS',
        'ANNET',
    ];
    const wrapper = shallow(
        <RedigerMaal avsluttRedigering={() => void 0} ledigeMaalkategorier={ledigeMaalKategorier as Maalkategori[]} />
    );
    expect(wrapper).toHaveLength(1);
});

import React from 'react';
import { shallow } from 'enzyme';
import ArbeidstidSteg from './ArbeidstidSteg';
import avtaleMock from '@/mocking/avtale-mock';

test('Test that <ArbeidstidSteg> renders correctly', () => {
    const wrapper = shallow(
        <ArbeidstidSteg
            avtale={avtaleMock}
            settAvtaleVerdi={() => {}}
            lagreAvtale={() => Promise.resolve()}
        />
    );
    expect(wrapper).toHaveLength(1);
});

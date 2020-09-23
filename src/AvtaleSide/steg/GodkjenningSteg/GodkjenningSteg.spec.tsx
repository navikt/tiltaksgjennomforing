import React from 'react';
import { shallow } from 'enzyme';
import GodkjenningSteg from './GodkjenningSteg';
import OppsummeringLonnstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringLonnstilskudd/OppsummeringLonnstilskudd';
import { AvtaleContext } from '@/AvtaleContext';
import lonnstilskuddAvtaleMock from '@/mocking/lonnstilskudd-avtale-mock';

test('Test that <GodkjenningSteg> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={lonnstilskuddAvtaleMock as AvtaleContext}>
            <GodkjenningSteg oppsummering={OppsummeringLonnstilskudd} />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});

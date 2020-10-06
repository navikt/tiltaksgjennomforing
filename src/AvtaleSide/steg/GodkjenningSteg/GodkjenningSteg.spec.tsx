import { AvtaleContext } from '@/AvtaleProvider';
import OppsummeringLonnstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringLonnstilskudd/OppsummeringLonnstilskudd';
import lonnstilskuddAvtaleMock from '@/mocking/lonnstilskudd-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import GodkjenningSteg from './GodkjenningSteg';

test('Test that <GodkjenningSteg> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={lonnstilskuddAvtaleMock}>
            <GodkjenningSteg oppsummering={OppsummeringLonnstilskudd} />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});

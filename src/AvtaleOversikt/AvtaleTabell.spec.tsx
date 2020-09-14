import React from 'react';
import { shallow } from 'enzyme';
import AvtaleTabell from '@/AvtaleOversikt/AvtaleTabell';

test('Test that <AvtaleOversikt> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleTabell
            innloggetBruker={{
                erNavAnsatt: false,
                identifikator: '',
                organisasjoner: [{ bedriftNavn: 'Maxbo', bedriftNr: '9999999' }],
            }}
            avtaler={[]}
            varsler={[]}
        />
    );
    expect(wrapper).toHaveLength(1);
});

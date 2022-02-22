import React from 'react';
import { shallow } from 'enzyme';
import AvtaleTabell from '@/AvtaleOversikt/AvtaleTabell';
import { InnloggetBruker } from '@/types/innlogget-bruker';

interface T {
    t: InnloggetBruker;
}

test('Test that <AvtaleOversikt> renders correctly', () => {
    const wrapper = shallow(
        <AvtaleTabell
            innloggetBruker={{
                erNavAnsatt: false,
                identifikator: '',
                altinnOrganisasjoner: [],
                rolle: 'VEILEDER',
                tilganger: {
                    999999999: ['ARBEIDSTRENING', 'VARIG_LONNSTILSKUDD', 'MIDLERTIDIG_LONNSTILSKUDD', 'SOMMERJOBB'],
                },
                navEnheter: [
                    { verdi: '0906', navn: 'NAV Storebyen' },
                    { verdi: '0904', navn: 'NAV Lillebyen' },
                ],
                kanVæreBeslutter: true,
            }}
            avtaler={[]}
            varsler={[]}
        />
    );
    expect(wrapper).toHaveLength(1);
});

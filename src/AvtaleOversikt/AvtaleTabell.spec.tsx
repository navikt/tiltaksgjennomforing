import React from 'react';
import { shallow } from 'enzyme';
import AvtaleTabell from '@/AvtaleOversikt/AvtaleTabell';
import { InnloggetBruker } from '@/types/innlogget-bruker';

test('Test that <AvtaleOversikt> renders correctly', () => {
    const innlogetbruker: InnloggetBruker = {
        identifikator: '',
        erNavAnsatt: true,
        altinnOrganisasjoner: [
            {
                Name: '',
                OrganizationForm: '',
                OrganizationNumber: '',
                ParentOrganizationNumber: '',
                Status: '',
                Type: '',
            },
        ],
        rolle: 'ARBEIDSGIVER',
        tilganger: { ['']: ['ARBEIDSTRENING'] },
        navEnheter: [],
        kanVæreBeslutter: true,
    };

    const wrapper = shallow(
        <AvtaleTabell
            innloggetBruker={innlogetbruker}
            avtaler={[]}
            varsler={[]}
        />
    );
    expect(wrapper).toHaveLength(1);
});

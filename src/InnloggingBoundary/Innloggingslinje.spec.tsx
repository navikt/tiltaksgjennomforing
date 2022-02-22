import React from 'react';
import { shallow } from 'enzyme';
import Innloggingslinje from './Innloggingslinje';
import { InnloggetBruker } from '@/types/innlogget-bruker';

test('Test that <Innloggingslinje> renders correctly', () => {
    const innloggetBruker = {
        identifikator: '0000000',
    };

    const bruker: InnloggetBruker = {
        navEnheter: [],
        tilganger: { 999999999: [] },
        rolle: 'VEILEDER',
        altinnOrganisasjoner: [],
        identifikator: '',
        erNavAnsatt: true,
        kanVæreBeslutter: true,
    };

    const wrapper = shallow(<Innloggingslinje innloggetBruker={bruker} brukBackupmeny={false} />);
    expect(wrapper).toHaveLength(1);
});

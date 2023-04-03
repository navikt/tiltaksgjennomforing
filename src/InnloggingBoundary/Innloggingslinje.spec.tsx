import React from 'react';
import { shallow } from 'enzyme';
import Innloggingslinje from './Innloggingslinje';
import { InnloggetBruker } from '@/types/innlogget-bruker';

test('Test that <Innloggingslinje> renders correctly', () => {
    const innloggetBruker : InnloggetBruker = {
        identifikator: '0000000',
        altinnOrganisasjoner:  [{Name: 'lala', OrganizationForm: '', OrganizationNumber: '12456', ParentOrganizationNumber: '123456', Status: '',Type: ''}],
        erNavAnsatt: false,
        navEnheter: [],
        rolle: 'ARBEIDSGIVER',
        tilganger: {['12345678']: ['ARBEIDSTRENING']} 

    };
    const wrapper = shallow(<Innloggingslinje innloggetBruker={innloggetBruker} brukBackupmeny />);
    expect(wrapper).toHaveLength(1);
});

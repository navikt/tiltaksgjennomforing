import React from 'react';
import { shallow } from 'enzyme';
import LagretOppgave from './LagretOppgave';

test('Test that <LagretOppgave> renders correctly', () => {
    const myMock = jest.fn();
    const oppgave = {
        tittel: 'string',
        beskrivelse: 'string',
        opplaering: 'string',
    };
    const wrapper = shallow(<LagretOppgave endreOnClick={myMock} oppgave={oppgave} slettOnClick={myMock} />);
    expect(wrapper).toHaveLength(1);
});

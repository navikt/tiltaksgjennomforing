import React from 'react';
import { shallow } from 'enzyme';
import OpprettOppgave from './OpprettOppgave';

test('Test that <OpprettOppgave> renders correctly', () => {
    const stub = jest.fn();
    const mellomLagretArbeidsoppgave = {
        oppgaveTittel: 'string',
        oppgaveBeskrivelse: 'string',
        oppgaveOpplaering: 'string',
    };
    const wrapper = shallow(
        <OpprettOppgave
            fjerneMellomLagringArbeidsoppgave={stub}
            mellomLagretArbeidsoppgave={mellomLagretArbeidsoppgave}
            lagreOppgave={stub}
            setMellomLagringArbeidsoppgave={stub}
        />
    );
    expect(wrapper).toHaveLength(1);
});

import arbeidstreningAvtaleMock from '@/mocking/arbeidstrening-avtale-mock';
import { shallow } from 'enzyme';
import React from 'react';
import OpprettOppgave from './OpprettOppgave';

test('Test that <OpprettOppgave> renders correctly', () => {
    const stub = jest.fn();
    const mellomLagretArbeidsoppgave = {
        oppgaveTittel: '',
        oppgaveBeskrivelse: '',
        oppgaveOpplaering: '',
    };
    const wrapper = shallow(
        <OpprettOppgave
            {...arbeidstreningAvtaleMock}
            setBekreftelseModalIsOpen={() => null}
            fjerneMellomLagringArbeidsoppgave={stub}
            mellomLagretArbeidsoppgave={mellomLagretArbeidsoppgave}
            lagreOppgave={stub}
            setMellomLagringArbeidsoppgave={stub}
        />
    );
    expect(wrapper).toHaveLength(1);
});

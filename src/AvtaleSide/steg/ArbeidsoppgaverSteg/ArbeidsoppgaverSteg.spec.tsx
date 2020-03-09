import { tomAvtale } from '@/AvtaleContext';
import RedigerOppgave from '@/AvtaleSide/steg/ArbeidsoppgaverSteg/RedigerOppgave/RedigerOppgave';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import { Oppgave } from '@/types/avtale';
import { CommonWrapper, mount } from 'enzyme';
import { Knapp } from 'nav-frontend-knapper';
import { Input, Textarea } from 'nav-frontend-skjema';
import React from 'react';
import ArbeidsoppgaverSteg from './GamleArbeidsoppgaverSteg';

test('Test that <ArbeidsoppgaverSteg> renders correctly', async () => {
    const setValue = async (element: CommonWrapper, value: string) => {
        // @ts-ignore
        element.instance().value = value;
        await element.simulate('change');
    };
    const mellomLagringArbeidsoppgave = {
        oppgaveTittel: '',
        oppgaveBeskrivelse: '',
        oppgaveOpplaering: '',
    };
    const lagreOppgaveStub = jest.fn(async (oppgave: Oppgave) => {
        return 'void';
    });
    const wrapper = await mount(
        <ArbeidsoppgaverSteg
            utforHandlingHvisRedigerbar={(callback: () => void) => callback()}
            avtale={tomAvtale}
            mellomLagringArbeidsoppgave={mellomLagringArbeidsoppgave}
            lagreOppgave={lagreOppgaveStub}
        />
    );
    expect(wrapper).toHaveLength(1);
    const opprettOppgaveKnapp = wrapper.find(Knapp);
    expect(opprettOppgaveKnapp).toHaveLength(1);
    expect(wrapper.find(Textarea)).toHaveLength(0);
    await opprettOppgaveKnapp.simulate('click');
    expect(wrapper.find(Textarea)).toHaveLength(2);
    expect(wrapper.find(LagreKnapp)).toHaveLength(1);
    await setValue(wrapper.find('textarea').at(0), 'Beskrivelse av oppgaven');
    await setValue(wrapper.find('textarea').at(1), 'deltageren vil bli opplært i Y');
    await setValue(
        wrapper
            .find(Input)
            .find('input')
            .at(0),
        'arbeidsoppgavens navn'
    );
    await wrapper.find(Knapp).simulate('click');
    const redigerOppgaveState = wrapper.find(RedigerOppgave).state();
    expect(redigerOppgaveState.erLagret).toBeTruthy();
    expect(lagreOppgaveStub).toBeCalledTimes(1);
    wrapper.unmount();
});

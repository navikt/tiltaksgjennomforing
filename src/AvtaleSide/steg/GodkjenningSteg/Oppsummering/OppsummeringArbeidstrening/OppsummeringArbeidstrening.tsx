import { medContext, Rolle } from '@/AvtaleContext';
import { ArbeidstreningAvtaleinnhold } from '@/types/avtale';
import * as React from 'react';
import { FunctionComponent } from 'react';
import MaalOppsummering from '../maalOppsummering/MaalOppsummering';
import OppfolgingOppsummering from '../oppfølging/OppfolgingOppsummering';
import OppgaverOppsummering from '../oppgaveOppsummering/OppgaverOppsummering';
import Tilrettelegging from '../tilrettelegging/Tilrettelegging';
import VarighetOppsummering from '../varighet/VarighetOppsummering';

interface Props {
    avtale: ArbeidstreningAvtaleinnhold;
    rolle: Rolle;
}

const OppsummeringArbeidstrening: FunctionComponent<Props> = props => (
    <>
        <MaalOppsummering {...props.avtale} />
        <OppgaverOppsummering {...props.avtale} />
        <VarighetOppsummering {...props.avtale} />
        <OppfolgingOppsummering {...props.avtale} />
        <Tilrettelegging {...props.avtale} />
    </>
);

export default medContext(OppsummeringArbeidstrening);

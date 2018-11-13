import * as React from 'react';
import { EndreAvtale } from '../EndreAvtale';
import Stegvelger from '../Stegvelger';
import BekreftelseSteg from './BekreftelseSteg';
import MalsetningSteg from './MalsetningSteg';
import ArbeidstidSteg from './ArbeidstidSteg/ArbeidstidSteg';
import ArbeidsoppgaverSteg from './ArbeidsoppgaverSteg';
import OppfolgingSteg from './OppfolgingSteg';
import { Avtale } from '../avtale';

const AvtaleSeksjon = (props: Avtale & EndreAvtale) => (
    <Stegvelger>
        <MalsetningSteg label={'Målsetninger'} {...props} />
        <ArbeidsoppgaverSteg label={'Arbeidsoppgaver'} {...props} />
        <ArbeidstidSteg label={'Dato og arbeidstid'} {...props} />
        <OppfolgingSteg label={'Oppfølging'} {...props} />
        <BekreftelseSteg label={'Bekreftelse'} {...props} />
    </Stegvelger>
);

export default AvtaleSeksjon;

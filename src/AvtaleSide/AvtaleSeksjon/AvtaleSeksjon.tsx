import * as React from 'react';
import Stegvelger from '../Stegvelger';
import BekreftelseSteg from './BekreftelseSteg';
import MaalsetningSteg from './MaalsetningSteg';
import ArbeidstidSteg from './ArbeidstidSteg/ArbeidstidSteg';
import ArbeidsoppgaverSteg from './ArbeidsoppgaverSteg';
import OppfolgingSteg from './OppfolgingSteg';

const AvtaleSeksjon = () => (
    <Stegvelger>
        <MaalsetningSteg label={'Målsetninger'} />
        <ArbeidsoppgaverSteg label={'Arbeidsoppgaver'} />
        <ArbeidstidSteg label={'Dato og arbeidstid'} />
        <OppfolgingSteg label={'Oppfølging'} />
        <BekreftelseSteg label={'Bekreftelse'} />
    </Stegvelger>
);

export default AvtaleSeksjon;

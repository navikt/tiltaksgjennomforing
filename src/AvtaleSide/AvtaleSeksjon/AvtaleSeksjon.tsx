import * as React from 'react';
import AvtaleProps from '../AvtaleProps';
import Stegvelger from '../Stegvelger';
import BekreftelseSteg from './BekreftelseSteg';
import MalsetningSteg from './MalsetningSteg';
import ArbeidstidSteg from './ArbeidstidSteg/ArbeidstidSteg';
import ArbeidsoppgaverSteg from './ArbeidsoppgaverSteg';
import OppfolgingSteg from './OppfolgingSteg';

const AvtaleSeksjon = (props: AvtaleProps) => (
    <Stegvelger>
        <MalsetningSteg label={'Målsetninger'} {...props} />
        <ArbeidsoppgaverSteg label={'Arbeidsoppgaver'} {...props} />
        <ArbeidstidSteg label={'Dato og arbeidstid'} {...props} />
        <OppfolgingSteg label={'Oppfølging'} {...props} />
        <BekreftelseSteg label={'Bekreftelse'} {...props} />
    </Stegvelger>
);

export default AvtaleSeksjon;

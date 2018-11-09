import * as React from 'react';
import AvtaleProps from '../AvtaleProps';
import Stegvelger from '../Stegvelger';
import BekreftelseSteg from './BekreftelseSteg';
import MalsetningSteg from './MalsetningSteg';
import ArbeidstidSteg from './ArbeidstidSteg/ArbeidstidSteg';

const AvtaleSeksjon = (props: AvtaleProps) => (
    <Stegvelger>
        <MalsetningSteg label={'Målsetninger'} {...props} />
        <ArbeidstidSteg label={'Dato og arbeidstid'} {...props} />
        <BekreftelseSteg label={'Bekreftelse'} {...props} />
    </Stegvelger>
);

export default AvtaleSeksjon;

import * as React from 'react';
import AvtaleProps from '../AvtaleProps';
import Stegvelger from '../Stegvelger';
import ArbeidsgiverSteg from './ArbeidsgiverSteg';
import PersonSteg from './PersonSteg';

const KontaktinformasjonSeksjon = (props: AvtaleProps) => (
    <Stegvelger>
        <PersonSteg label={'Person'} {...props} />
        <ArbeidsgiverSteg label={'Arbeidsgiver'} {...props} />
    </Stegvelger>
);

export default KontaktinformasjonSeksjon;

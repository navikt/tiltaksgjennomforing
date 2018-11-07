import * as React from 'react';
import AvtaleProps from '../AvtaleProps';
import Stegvelger from '../Stegvelger';
import Arbeidsgiver from './Arbeidsgiver';
import Person from './Person';

const Kontaktinformasjon = (props: AvtaleProps) => (
    <Stegvelger>
        <Person label={'Person'} {...props} />
        <Arbeidsgiver label={'Arbeidsgiver'} {...props} />
    </Stegvelger>
);

export default Kontaktinformasjon;

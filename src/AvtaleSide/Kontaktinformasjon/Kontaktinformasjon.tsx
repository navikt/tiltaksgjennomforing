import * as React from 'react';
import Arbeidsgiver from './Arbeidsgiver';
import AvtaleModell from '../AvtaleModell';
import Person from './Person';
import Stegvelger from '../Stegvelger';

interface Props {
    oppdaterAvtale: (event: any) => void;
    form: AvtaleModell;
}

const Kontaktinformasjon = (props: Props) => (
    <Stegvelger>
        <Person
            label={'Person'}
            oppdaterAvtale={props.oppdaterAvtale}
            form={props.form}
        />
        <Arbeidsgiver
            label={'Arbeidsgiver'}
            oppdaterAvtale={props.oppdaterAvtale}
            form={props.form}
        />
    </Stegvelger>
);

export default Kontaktinformasjon;

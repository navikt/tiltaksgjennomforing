import * as React from 'react';
import AvtaleModell from '../AvtaleModell';
import Bekreftelse from './Bekreftelse';
import Malsetning from './Malsetning';
import Stegvelger from '../Stegvelger';

interface Props {
    oppdaterAvtale: (event: any) => void;
    form: AvtaleModell;
}

const Avtale = (props: Props) => (
    <Stegvelger>
        <Malsetning
            label={'Målsetninger'}
            oppdaterAvtale={props.oppdaterAvtale}
            form={props.form}
        />
        <Bekreftelse
            label={'Bekreftelse'}
            oppdaterAvtale={props.oppdaterAvtale}
            form={props.form}
        />
    </Stegvelger>
);

export default Avtale;

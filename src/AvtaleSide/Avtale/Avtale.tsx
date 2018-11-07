import * as React from 'react';
import AvtaleProps from '../AvtaleProps';
import Stegvelger from '../Stegvelger';
import Bekreftelse from './Bekreftelse';
import Malsetning from './Malsetning';


const Avtale = (props: AvtaleProps) => (
    <Stegvelger>
        <Malsetning label={'Målsetninger'} {...props} />
        <Bekreftelse label={'Bekreftelse'} {...props} />
    </Stegvelger>
);

export default Avtale;

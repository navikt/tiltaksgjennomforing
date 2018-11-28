import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    tittel: string;
    children: React.ReactNode;
}

const Stegoppsummering = (props: Props) => (
    <>
        <Undertittel className="stegoppsummering__tittel">
            {props.tittel}
        </Undertittel>
        {props.children}
    </>
);

export default Stegoppsummering;

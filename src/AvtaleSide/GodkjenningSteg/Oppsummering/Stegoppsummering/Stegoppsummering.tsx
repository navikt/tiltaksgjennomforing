import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
    tittel: string;
}

const Stegoppsummering: React.FunctionComponent<Props> = props => (
    <div className="stegoppsummering">
        <Undertittel className="stegoppsummering__tittel">
            {props.tittel}
        </Undertittel>
        {props.children}
    </div>
);

export default Stegoppsummering;

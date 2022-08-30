import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';

const SjekkOmVerdiEksisterer: FunctionComponent<{
    verdi?: string;
    formatertVerdi?: JSX.Element | string;
    clsName?: string;
    label?: string;
    ariaLabel?: string
}> = props => {
    if (props.verdi) {
        return (
            <Normaltekst aria-label={props.ariaLabel}>
                {props.label} {props.formatertVerdi ? props.formatertVerdi : props.verdi}
            </Normaltekst>
        );
    }
    return (
        <div>
            <EtikettFokus>Ikke fylt ut</EtikettFokus>
        </div>
    );
};

export default SjekkOmVerdiEksisterer;

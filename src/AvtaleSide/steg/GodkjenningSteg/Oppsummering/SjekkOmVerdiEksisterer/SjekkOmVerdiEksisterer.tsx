import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';

const SjekkOmVerdiEksisterer: FunctionComponent<{
    verdi?: string;
    label?: string;
}> = props => {
    if (props.verdi) {
        return (
            <Normaltekst>
                {props.label} {props.verdi}
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

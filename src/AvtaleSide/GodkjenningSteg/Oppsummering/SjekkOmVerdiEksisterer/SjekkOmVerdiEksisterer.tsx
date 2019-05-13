import EtikettFokus from 'nav-frontend-etiketter/lib/etikettfokus';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';
import BEMHelper from '../../../../utils/bem';

const SjekkOmVerdiEksisterer: FunctionComponent<{
    verdi: string;
    clsName: string;
    label?: string;
}> = props => {
    const classN = BEMHelper(props.clsName);

    if (props.verdi) {
        return (
            <Normaltekst className={classN.element('navn')}>
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

import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import IngenAvtalerArbeidsgiver from './IngenAvtalerArbeidsgiver';

type Props = {
    visAlleAvtalerChecked: boolean;
};

const IngenAvtaler: FunctionComponent<Props> = props => {
    const innloggetPart = sessionStorage.getItem(INNLOGGET_PART);

    if (innloggetPart === 'veileder') {
        return (
            <div>
                <Normaltekst>
                    Du har ikke {props.visAlleAvtalerChecked ? 'tilgang til' : 'opprettet'} noen avtaler
                </Normaltekst>
            </div>
        );
    } else if (innloggetPart === 'deltaker') {
        return (
            <div>
                <Normaltekst>
                    Det har ikke blitt opprettet noen avtaler hvor du er med enda. Vennligst vent på veileder i NAV.
                </Normaltekst>
            </div>
        );
    } else if (innloggetPart === 'arbeidsgiver') {
        return <IngenAvtalerArbeidsgiver />;
    } else {
        return null;
    }
};

export default IngenAvtaler;

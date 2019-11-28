import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import BEMHelper from '@/utils/bem';
import { Ingress, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import './IngenAvtaler.less';
import IngenAvtalerArbeidsgiver from './IngenAvtalerArbeidsgiver';

type Props = {
    visAlleAvtalerChecked: boolean;
};

const cls = BEMHelper('ingenAvtaler');

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
            <div className={cls.element('tekst')}>
                <div className={cls.element('headerTekst')}>
                    <Innholdstittel>Ingen avtaler</Innholdstittel>
                </div>
                <Ingress>Det har ikke blitt opprettet noen avtaler hvor du er med enda.</Ingress>
                <Ingress>Vennligst vent på veileder i NAV.</Ingress>
            </div>
        );
    } else if (innloggetPart === 'arbeidsgiver') {
        return <IngenAvtalerArbeidsgiver />;
    } else {
        return null;
    }
};

export default IngenAvtaler;

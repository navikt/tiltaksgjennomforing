import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import BEMHelper from '@/utils/bem';
import classNames from 'classnames';
import { Ingress, Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import './IngenAvtaler.less';
import IngenAvtalerArbeidsgiver from './IngenAvtalerArbeidsgiver';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';

const cls = BEMHelper('ingenAvtaler');

const IngenAvtaler: FunctionComponent<{}> = () => {
    const innloggetPart = sessionStorage.getItem(INNLOGGET_PART);

    if (innloggetPart === 'veileder') {
        return (
            <div className={classNames(cls.element('ingenavtalerveileder'), 'innholdsboks')}>
                <InfoIkon />
                <VerticalSpacer sixteenPx={true} />
                <Undertittel>Finner ingen avtaler</Undertittel>
            </div>
        );
    } else if (innloggetPart === 'deltaker') {
        return (
            <Innholdsboks>
                <div className={cls.element('tekst')}>
                    <div className={cls.element('headerTekst')}>
                        <Innholdstittel>Ingen avtaler</Innholdstittel>
                    </div>
                    <Ingress>Det har ikke blitt opprettet noen avtaler hvor du er med enda.</Ingress>
                    <Ingress>Vennligst vent på veileder i NAV.</Ingress>
                </div>
            </Innholdsboks>
        );
    } else if (innloggetPart === 'arbeidsgiver') {
        return <IngenAvtalerArbeidsgiver />;
    } else {
        return null;
    }
};

export default IngenAvtaler;

import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import BEMHelper from '@/utils/bem';
import classNames from 'classnames';
import { Ingress, Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useCookies } from 'react-cookie';
import './IngenAvtaler.less';
import IngenAvtalerArbeidsgiver from './IngenAvtalerArbeidsgiver';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';

const cls = BEMHelper('ingenAvtaler');

const IngenAvtaler: FunctionComponent = () => {
    const [cookies] = useCookies();
    const innloggetPart = cookies[INNLOGGET_PART];

    if (innloggetPart === 'VEILEDER') {
        return (
            <div className={classNames(cls.element('ingenavtalerveileder'), 'innholdsboks')}>
                <InfoIkon />
                <VerticalSpacer sixteenPx={true} />
                <Undertittel>Finner ingen avtaler</Undertittel>
            </div>
        );
    } else if (innloggetPart === 'DELTAKER') {
        return (
            <Innholdsboks>
                <div className={cls.element('tekst')}>
                    <Innholdstittel>Ingen avtaler</Innholdstittel>
                    <VerticalSpacer sixteenPx={true} />
                    <Ingress>Det har ikke blitt opprettet noen avtaler hvor du er med enda.</Ingress>
                    <Ingress>Vennligst vent på veileder i NAV.</Ingress>
                </div>
            </Innholdsboks>
        );
    } else if (innloggetPart === 'ARBEIDSGIVER') {
        return <IngenAvtalerArbeidsgiver />;
    } else {
        return null;
    }
};

export default IngenAvtaler;

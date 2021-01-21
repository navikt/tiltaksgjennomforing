import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import { Avtale } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import classNames from 'classnames';
import { Ingress, Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, useContext } from 'react';
import { useCookies } from 'react-cookie';
import './IngenAvtaler.less';
import IngenAvtalerArbeidsgiver from './arbeidsgiver/IngenAvtalerArbeidsgiver';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';

const cls = BEMHelper('ingenAvtaler');

type Props = {
    sokekriterier: Partial<Avtale>;
};

const IngenAvtaler: FunctionComponent<Props> = props => {
    const [cookies] = useCookies();
    const innloggetPart = cookies[INNLOGGET_PART];
    const innloggetBruker = useContext(InnloggetBrukerContext);

    if (innloggetPart === 'VEILEDER') {
        return (
            <div className={classNames(cls.element('ingenavtalerveileder'), 'innholdsboks')}>
                <div style={{ display: 'flex' }}>
                    <InfoIkon />
                    <Undertittel style={{ marginLeft: '1rem' }}>Finner ingen avtaler</Undertittel>
                </div>
                <VerticalSpacer rem={1} />
                {props.sokekriterier.veilederNavIdent === innloggetBruker.identifikator ? (
                    <Normaltekst>Du har ingen avtaler som er tilknyttet deg.</Normaltekst>
                ) : (
                    <Normaltekst>Finner ingen avtaler som passer med valgt filter.</Normaltekst>
                )}
            </div>
        );
    } else if (innloggetPart === 'BESLUTTER') {
        return (
            <div className={classNames(cls.element('ingenavtalerveileder'), 'innholdsboks')}>
                <div style={{ display: 'flex' }}>
                    <InfoIkon />
                    <Undertittel style={{ marginLeft: '1rem' }}>Finner ingen avtaler</Undertittel>
                </div>
                <VerticalSpacer rem={1} />
            </div>
        );
    } else if (innloggetPart === 'DELTAKER') {
        return (
            <Innholdsboks>
                <div className={cls.element('tekst')}>
                    <Innholdstittel>Ingen avtaler</Innholdstittel>
                    <VerticalSpacer sixteenPx={true} />
                    <Ingress>Det har ikke blitt opprettet noen avtaler hvor du er med enda.</Ingress>
                </div>
            </Innholdsboks>
        );
    } else if (innloggetPart === 'ARBEIDSGIVER') {
        return <IngenAvtalerArbeidsgiver {...props.sokekriterier} />;
    } else {
        return null;
    }
};

export default IngenAvtaler;

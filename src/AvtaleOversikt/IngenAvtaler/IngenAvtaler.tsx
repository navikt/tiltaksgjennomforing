import { ReactComponent as InfoIkon } from '@/assets/ikoner/info.svg';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import BEMHelper from '@/utils/bem';
import classNames from 'classnames';
import { BodyShort, Heading, Ingress } from '@navikt/ds-react';
import React, { FunctionComponent, useContext } from 'react';
import { useCookies } from 'react-cookie';
import './IngenAvtaler.less';
import IngenAvtalerArbeidsgiver from './arbeidsgiver/IngenAvtalerArbeidsgiver';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';

const cls = BEMHelper('ingenAvtaler');

enum InnloggetPart {
    veileder = 'VEILEDER',
    beslutter = 'BESLUTTER',
    deltaker = 'DELTAKER',
    arbeidsgiver = 'ARBEIDSGIVER',
    mentor = 'MENTOR',
}

const FinnerIngenAvtaler = () => {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <InfoIkon />
                <Heading size="small" style={{ marginLeft: '1rem' }}>
                    Finner ingen avtaler
                </Heading>
            </div>
            <VerticalSpacer rem={1} />
        </>
    );
};

const IngenAvtalerHvorDuErMed = () => {
    return (
        <Innholdsboks>
            <div className={cls.element('tekst')}>
                <Heading size="large">Ingen avtaler</Heading>
                <VerticalSpacer rem={1} />
                <Ingress>Det har ikke blitt opprettet noen avtaler hvor du er med enda.</Ingress>
            </div>
        </Innholdsboks>
    );
};

const IngenAvtaler: FunctionComponent = () => {
    const [cookies] = useCookies();
    const innloggetPart = cookies[INNLOGGET_PART];
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { filtre } = useFilter();

    switch (innloggetPart) {
        case InnloggetPart.veileder:
            return (
                <div className={classNames(cls.element('ingenavtalerveileder'), 'innholdsboks')}>
                    <FinnerIngenAvtaler />
                    {filtre.veilederNavIdent === innloggetBruker.identifikator ? (
                        <BodyShort size="small">Du har ingen avtaler som er tilknyttet deg.</BodyShort>
                    ) : (
                        <BodyShort size="small">Finner ingen avtaler som passer med valgt filter.</BodyShort>
                    )}
                </div>
            );
        case InnloggetPart.beslutter:
            return (
                <div className={classNames(cls.element('ingenavtalerveileder'), 'innholdsboks')}>
                    <FinnerIngenAvtaler />
                </div>
            );
        case InnloggetPart.deltaker:
            return <IngenAvtalerHvorDuErMed />;
        case InnloggetPart.arbeidsgiver:
            return <IngenAvtalerArbeidsgiver bedriftNr={filtre.bedrift} tiltakstype={filtre.tiltakstype} />;
        case InnloggetPart.mentor:
            return <IngenAvtalerHvorDuErMed />;
        default:
            return null;
    }
};

export default IngenAvtaler;

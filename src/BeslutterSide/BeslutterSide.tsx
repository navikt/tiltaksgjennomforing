import { AvtaleContext } from '@/AvtaleProvider';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { avtaleTittel, tiltakstypeTekst } from '@/messages';
import BEMHelper from '@/utils/bem';
import React, { Dispatch, FunctionComponent, SetStateAction, Suspense, useContext, useState } from 'react';
import './BeslutterSide.less';
import BeslutterPanel from '@/BeslutterSide/beslutterPanel/BeslutterPanel';
import BeslutterTilskuddsPerioder from '@/BeslutterSide/beslutterTilskuddsperioder/BeslutterTilskuddsperioder';
import { Accordion, Heading } from '@navikt/ds-react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import OppsummeringLonnstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringLonnstilskudd/OppsummeringLonnstilskudd';
import { TiltaksType } from '@/types/avtale';
import OppsummeringArbeidstrening from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringArbeidstrening/OppsummeringArbeidstrening';
import OppsummeringMentor from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringMentor/OppsummeringMentor';
import OppsummeringInkluderingstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringInkluderingstilskudd/OppsummeringInkluderingstilskudd';
import VersjoneringKomponent from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/VersjoneringKomponent';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import OppsummeringVTAO from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringVTAO/OppsummeringVTAO';

const cls = BEMHelper('beslutter-side');

export interface Periode {
    visReturModal: boolean;
    setVisReturModal: Dispatch<SetStateAction<boolean>>;
    enhet?: string;
    setEnhet: Dispatch<SetStateAction<string | undefined>>;
    visEnhetFeil: boolean;
    setVisEnhetFeil: Dispatch<SetStateAction<boolean>>;
}

export const TilskuddsperiodeContext = React.createContext<Periode>({} as Periode);

const BeslutterSide: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const { gjeldendeTilskuddsperiode, enhetOppfolging, enhetGeografisk } = avtale;
    const [visReturModal, setVisReturModal] = useState(false);
    const defaultEnhet = gjeldendeTilskuddsperiode?.enhet || enhetOppfolging || enhetGeografisk || '';
    const [enhet, setEnhet] = useState<string | undefined>(
        gjeldendeTilskuddsperiode && gjeldendeTilskuddsperiode?.løpenummer > 1
            ? (avtale.tilskuddPeriode[gjeldendeTilskuddsperiode?.løpenummer - 1].enhet ?? defaultEnhet)
            : defaultEnhet,
    );
    const [visEnhetFeil, setVisEnhetFeil] = useState<boolean>(false);
    const [, setClsName] = useState<string>();
    const [visVersjon, setVisVersjon] = useState(false);

    const fadeInOut = () => {
        setClsName(cls.element('fade'));
        setTimeout(() => {
            setClsName(undefined);
        }, 300);
    };

    const context: Periode = {
        visReturModal,
        setVisReturModal,
        enhet,
        setEnhet,
        visEnhetFeil,
        setVisEnhetFeil,
    };

    const oppsummeringType: { [key in TiltaksType]: JSX.Element } = {
        ARBEIDSTRENING: <OppsummeringArbeidstrening avtaleinnhold={avtale.gjeldendeInnhold} />,
        MIDLERTIDIG_LONNSTILSKUDD: <OppsummeringLonnstilskudd avtaleinnhold={avtale.gjeldendeInnhold} />,
        VARIG_LONNSTILSKUDD: <OppsummeringLonnstilskudd avtaleinnhold={avtale.gjeldendeInnhold} />,
        MENTOR: <OppsummeringMentor avtaleinnhold={avtale.gjeldendeInnhold} />,
        INKLUDERINGSTILSKUDD: <OppsummeringInkluderingstilskudd avtaleinnhold={avtale.gjeldendeInnhold} />,
        SOMMERJOBB: <OppsummeringLonnstilskudd avtaleinnhold={avtale.gjeldendeInnhold} />,
        VTAO: <OppsummeringVTAO avtaleinnhold={avtale.gjeldendeInnhold} />,
    };

    return (
        <>
            <TilskuddsperiodeContext.Provider value={context}>
                <VerticalSpacer rem={2} />
                <div className={cls.element('innhold')}>
                    <div className={cls.element('head-wrapper')}>
                        <TilbakeTilOversiktLenke />
                        <Heading size="large" className={cls.element('hoved-tittel')}>
                            Tilskudd om {tiltakstypeTekst[avtale.tiltakstype]}
                        </Heading>
                    </div>
                    <div className={cls.element('wrapper')}>
                        <BeslutterPanel />
                        <BeslutterTilskuddsPerioder startAnimering={fadeInOut} />
                    </div>
                    <VerticalSpacer rem={1} />
                    <div className={cls.element('avtale-wrapper')}>
                        <Accordion className="accordion" onClick={() => setVisVersjon(!visVersjon)}>
                            <Accordion.Item>
                                <Accordion.Header>Se avtalen</Accordion.Header>
                                <Accordion.Content>
                                    <Innholdsboks>
                                        <Heading size="large">{avtaleTittel[avtale.tiltakstype]}</Heading>
                                        <VerticalSpacer rem={2} />
                                        {oppsummeringType[avtale.tiltakstype]}
                                    </Innholdsboks>
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    {visVersjon && (
                        <div className={cls.element('avtale-versjon-wrapper')}>
                            <VersjoneringKomponent avtale={avtale} />
                        </div>
                    )}
                </div>
            </TilskuddsperiodeContext.Provider>
        </>
    );
};

export default BeslutterSide;

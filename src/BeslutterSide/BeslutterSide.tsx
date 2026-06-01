import { AvtaleContext } from '@/AvtaleProvider';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { avtaleTittel, tiltakstypeTekst } from '@/messages';
import BEMHelper from '@/utils/bem';
import React, { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from 'react';
import './BeslutterSide.less';
import BeslutterPanel from '@/BeslutterSide/beslutterPanel/BeslutterPanel';
import BeslutterTilskuddsPerioder from '@/BeslutterSide/beslutterTilskuddsperioder/BeslutterTilskuddsperioder';
import { ExpansionCard, Heading } from '@navikt/ds-react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VersjoneringKomponent from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/VersjoneringKomponent';
import Oppsummering from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Oppsummering';

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
                        <BeslutterTilskuddsPerioder />
                    </div>
                    <VerticalSpacer rem={1} />
                    <div className={cls.element('avtale-wrapper')}>
                        <ExpansionCard aria-label="Se avtalen" size="small" onClick={() => setVisVersjon(!visVersjon)}>
                            <ExpansionCard.Header>
                                <ExpansionCard.Title size="small">Se avtalen</ExpansionCard.Title>
                                <ExpansionCard.Description>
                                    {avtaleTittel[avtale.tiltakstype]}
                                </ExpansionCard.Description>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content>
                                <Innholdsboks>
                                    <Heading size="large">{avtaleTittel[avtale.tiltakstype]}</Heading>
                                    <VerticalSpacer rem={2} />
                                    <Oppsummering
                                        tiltakstype={avtale.tiltakstype}
                                        avtaleInnhold={avtale.gjeldendeInnhold}
                                        erAvtaleInngaatt={!!avtale.avtaleInngått}
                                    />
                                </Innholdsboks>
                            </ExpansionCard.Content>
                        </ExpansionCard>
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

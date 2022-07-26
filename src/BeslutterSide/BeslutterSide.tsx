import { AvtaleContext } from '@/AvtaleProvider';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import {avtaleTittel, tiltakstypeTekst} from '@/messages';
import BEMHelper from '@/utils/bem';
import { Innholdstittel } from 'nav-frontend-typografi';
import React, {Dispatch, FunctionComponent, SetStateAction, useContext, useState} from 'react';
import './BeslutterSide.less';
import BeslutterPanel from "@/BeslutterSide/beslutterPanel/BeslutterPanel";
import BeslutterTilskuddsPerioder from "@/BeslutterSide/beslutterTilskuddsperioder/BeslutterTilskuddsperioder";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Innholdsboks from "@/komponenter/Innholdsboks/Innholdsboks";
import Avtaleparter from "@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/Avtaleparter/Avtaleparter";
import OppsummeringLonnstilskudd
    from "@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringLonnstilskudd/OppsummeringLonnstilskudd";


const cls = BEMHelper('beslutter-side');

export interface Periode {
    visAvslag: boolean;
    setVisAvslag: Dispatch<SetStateAction<boolean>>;
    enhet: string;
    setEnhet: Dispatch<SetStateAction<string>>;
    enhetFeil: string | undefined;
    setEnhetFeil: Dispatch<SetStateAction<string | undefined>>
}

export const TilskuddsperiodeContext = React.createContext<Periode>({} as Periode)

const BeslutterSide: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const { gjeldendeTilskuddsperiode, enhetOppfolging, enhetGeografisk } = avtale;
    const [visAvslag, setVisAvslag] = useState(false);
    const defaultEnhet = gjeldendeTilskuddsperiode?.enhet || enhetOppfolging || enhetGeografisk || '';
    const [enhet, setEnhet] = useState(
        gjeldendeTilskuddsperiode && gjeldendeTilskuddsperiode?.løpenummer > 1 ?
            avtale.tilskuddPeriode[gjeldendeTilskuddsperiode?.løpenummer - 1].enhet ?? defaultEnhet : defaultEnhet);
    const [enhetFeil, setEnhetFeil ] = useState<string | undefined>(undefined);
    const [, setClsName] = useState<string>();

    const fadeInOut = () => {
        setClsName(cls.element('fade'));
        setTimeout(() => {
            setClsName(undefined);
        }, 300);
    };

    const context: Periode = {
        visAvslag: visAvslag,
        setVisAvslag: setVisAvslag,
        enhet: enhet,
        setEnhet: setEnhet,
        enhetFeil: enhetFeil,
        setEnhetFeil: setEnhetFeil
    }

    return (
        <>
            <TilskuddsperiodeContext.Provider value={context}>
            <VerticalSpacer rem={2} />
            <div className={cls.element('container')}>
                <div className={cls.element('innhold')}>

                    <div className={cls.element('head-wrapper')}>
                        <TilbakeTilOversiktLenke />
                        <Innholdstittel className={cls.element('hoved-tittel')}>
                            Tilskudd om {tiltakstypeTekst[avtale.tiltakstype]}
                        </Innholdstittel>
                    </div>
                    <div className={cls.element('wrapper')}>
                        <BeslutterPanel />
                        <BeslutterTilskuddsPerioder startAnimering={fadeInOut} />
                    </div>
                    <VerticalSpacer rem={1} />
                    <div className={cls.element('avtale-wrapper')}>
                        <Ekspanderbartpanel tittel="Se avtalen">
                            <Innholdsboks>
                                <Innholdstittel>{avtaleTittel[avtale.tiltakstype]}</Innholdstittel>
                                <VerticalSpacer rem={2} />
                                <Avtaleparter avtaleinnhold={avtale.gjeldendeInnhold}/>
                                <OppsummeringLonnstilskudd avtaleinnhold={avtale.gjeldendeInnhold} />
                            </Innholdsboks>
                        </Ekspanderbartpanel>
                    </div>
                </div>
            </div>
            </TilskuddsperiodeContext.Provider>
        </>
    );
};

export default BeslutterSide;

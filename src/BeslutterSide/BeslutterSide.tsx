import { AvtaleContext } from '@/AvtaleProvider';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { tiltakstypeTekst } from '@/messages';
import BEMHelper from '@/utils/bem';
import { Innholdstittel } from 'nav-frontend-typografi';
import React, {Dispatch, FunctionComponent, SetStateAction, useContext, useState} from 'react';
import './BeslutterSide.less';
import BeslutterPanel from "@/BeslutterSide/beslutterPanel/BeslutterPanel";
import {TilskuddsPeriode} from "@/types/avtale";
import BeslutterTilskuddsPerioder from "@/BeslutterSide/beslutterTilskuddsperioder/BeslutterTilskuddsperioder";


const cls = BEMHelper('beslutter-side');

interface Periode {
    periode: TilskuddsPeriode | undefined;
    setPeriode: Dispatch<SetStateAction<TilskuddsPeriode | undefined>>
}

export const TilskuddsperiodeContext = React.createContext<Periode>({} as Periode)

const BeslutterSide: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const [periode, setPeriode] = useState<TilskuddsPeriode>()
    const [, setClsName] = useState<string>();

    const fadeInOut = () => {
        setClsName(cls.element('fade'));
        setTimeout(() => {
            setClsName(undefined);
        }, 300);
    };

    const context: Periode = {
        periode: periode,
        setPeriode: setPeriode
    }

    return (
        <>
            <TilskuddsperiodeContext.Provider value={context}>
            <VerticalSpacer rem={2} />
            <div className={cls.element('container')}>
                <div className={cls.element('innhold')}>
                    <TilbakeTilOversiktLenke />
                    <Innholdstittel className={cls.element('hoved-tittel')}>
                        Tilskudd om {tiltakstypeTekst[avtaleContext.avtale.tiltakstype]}
                    </Innholdstittel>
                    <div className={cls.element('wrapper')}>
                        <BeslutterPanel />
                        <div className="beslutter-tilskuddsperioder">
                            <BeslutterTilskuddsPerioder startAnimering={fadeInOut} />
                        </div>
                    </div>
                    <VerticalSpacer rem={1} />
            {/*        <Ekspanderbartpanel tittel="Se avtalen">
                        <Innholdsboks>
                            <Innholdstittel>{avtaleTittel[avtaleContext.avtale.tiltakstype]}</Innholdstittel>
                            <VerticalSpacer rem={2} />
                            <Avtaleparter />
                            <OppsummeringLonnstilskudd avtaleinnhold={avtaleContext.avtale.gjeldendeInnhold} />
                        </Innholdsboks>
                    </Ekspanderbartpanel>*/}
                </div>
            </div>
            </TilskuddsperiodeContext.Provider>
        </>
    );
};

export default BeslutterSide;

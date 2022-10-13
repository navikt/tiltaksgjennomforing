import { AvtaleContext } from '@/AvtaleProvider';
import TilbakeTilOversiktLenke from '@/AvtaleSide/TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { avtaleTittel, tiltakstypeTekst } from '@/messages';
import BEMHelper from '@/utils/bem';
import { Innholdstittel } from 'nav-frontend-typografi';
import React, { Dispatch, FunctionComponent, SetStateAction, useContext, useState } from 'react';
import './BeslutterSide.less';
import BeslutterPanel from '@/BeslutterSide/beslutterPanel/BeslutterPanel';
import BeslutterTilskuddsPerioder from '@/BeslutterSide/beslutterTilskuddsperioder/BeslutterTilskuddsperioder';
import { Accordion } from '@navikt/ds-react';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import OppsummeringLonnstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringLonnstilskudd/OppsummeringLonnstilskudd';
import { TiltaksType } from '@/types/avtale';
import OppsummeringArbeidstrening from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringArbeidstrening/OppsummeringArbeidstrening';
import OppsummeringMentor from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringMentor/OppsummeringMentor';
import OppsummeringInkluderingstilskudd from '@/AvtaleSide/steg/GodkjenningSteg/Oppsummering/OppsummeringInkluderingstilskudd/OppsummeringInkluderingstilskudd';

const cls = BEMHelper('beslutter-side');

export interface Periode {
    visAvslag: boolean;
    setVisAvslag: Dispatch<SetStateAction<boolean>>;
    enhet: string;
    setEnhet: Dispatch<SetStateAction<string>>;
    enhetFeil: string | undefined;
    setEnhetFeil: Dispatch<SetStateAction<string | undefined>>;
}

export const TilskuddsperiodeContext = React.createContext<Periode>({} as Periode);

const BeslutterSide: FunctionComponent = () => {
    const { avtale } = useContext(AvtaleContext);
    const { gjeldendeTilskuddsperiode, enhetOppfolging, enhetGeografisk } = avtale;
    const [visAvslag, setVisAvslag] = useState(false);
    const defaultEnhet = gjeldendeTilskuddsperiode?.enhet || enhetOppfolging || enhetGeografisk || '';
    const [enhet, setEnhet] = useState(
        gjeldendeTilskuddsperiode && gjeldendeTilskuddsperiode?.løpenummer > 1
            ? avtale.tilskuddPeriode[gjeldendeTilskuddsperiode?.løpenummer - 1].enhet ?? defaultEnhet
            : defaultEnhet
    );
    const [enhetFeil, setEnhetFeil] = useState<string | undefined>(undefined);
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
        setEnhetFeil: setEnhetFeil,
    };

    const oppsummeringType: { [key in TiltaksType]: JSX.Element } = {
        ARBEIDSTRENING: <OppsummeringArbeidstrening avtaleinnhold={avtale.gjeldendeInnhold} />,
        MIDLERTIDIG_LONNSTILSKUDD: <OppsummeringLonnstilskudd avtaleinnhold={avtale.gjeldendeInnhold} />,
        VARIG_LONNSTILSKUDD: <OppsummeringLonnstilskudd avtaleinnhold={avtale.gjeldendeInnhold} />,
        MENTOR: <OppsummeringMentor avtaleinnhold={avtale.gjeldendeInnhold} />,
        INKLUDERINGSTILSKUDD: <OppsummeringInkluderingstilskudd avtaleinnhold={avtale.gjeldendeInnhold} />,
        SOMMERJOBB: <OppsummeringLonnstilskudd avtaleinnhold={avtale.gjeldendeInnhold} />,
    };

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
                            <Accordion className='accordion'>
                                <Accordion.Item>
                                    <Accordion.Header>Se avtalen</Accordion.Header>
                                    <Accordion.Content>
                                        <Innholdsboks>
                                            <Innholdstittel>{avtaleTittel[avtale.tiltakstype]}</Innholdstittel>
                                            <VerticalSpacer rem={2} />
                                            {oppsummeringType[avtale.tiltakstype]}
                                        </Innholdsboks>
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </TilskuddsperiodeContext.Provider>
        </>
    );
};

export default BeslutterSide;

import { Context, medContext, Rolle } from '@/AvtaleContext';
import Banner from '@/komponenter/Banner/Banner';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import VarselKomponent from '@/komponenter/Varsel/VarselKomponent';
import { ApiError } from '@/types/errors';
import BEMHelper from '@/utils/bem';
import hentAvtaleSteg from '@/utils/stegUtils';
import moment from 'moment';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import AvtaleFetcher from './AvtaleFetcher';
import './AvtaleSide.less';
import DesktopAvtaleSide from './DesktopAvtaleSide/DesktopAvtaleSide';
import ArbeidsgiverInstruks from './GodkjenningSteg/Oppsummering/instruks/ArbeidsgiverInstruks';
import DeltakerInstruks from './GodkjenningSteg/Oppsummering/instruks/DeltakerInstruks';
import VeilederInstruks from './GodkjenningSteg/Oppsummering/instruks/VeilederInstruks';
import OppsummeringArbeidstrening from './GodkjenningSteg/Oppsummering/OppsummeringArbeidstrening/OppsummeringArbeidstrening';
import MobilAvtaleSide from './MobilAvtaleSide/MobilAvtaleSide';
import TilbakeTilOversiktLenke from './TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';

interface MatchProps {
    avtaleId: string;
    stegPath: string;
}

const cls = BEMHelper('avtaleside');

type Props = RouteComponentProps<MatchProps> & Context;

type StegId =
    | 'kontaktinformasjon'
    | 'maal'
    | 'arbeidsoppgaver'
    | 'arbeidstid'
    | 'oppfolging'
    | 'stilling'
    | 'lonnstilskuddvarighet'
    | 'beregningtilskudd'
    | 'godkjenning';

export interface StegInfo {
    komponent: React.ReactNode;
    label: string;
    id: StegId;
}

const AvtaleSide: FunctionComponent<Props> = props => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const [aktivtSteg, setAktivtSteg] = useState<StegInfo | undefined>();

    const handleWindowSize = () => {
        setWindowSize(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowSize);
        return () => window.removeEventListener('resize', handleWindowSize);
    });

    const avtaleSteg: StegInfo[] = hentAvtaleSteg[props.avtale.tiltakstype];

    const erDesktop = windowSize > 767;

    const finnSteg = (id: StegId) => avtaleSteg.find(steg => steg.id === id);

    useEffect(() => {
        setAktivtSteg(
            avtaleSteg.find(steg => steg.id === props.match.params.stegPath)
        );
    }, [props.match.params.stegPath]);

    const instruks = (rolle: Rolle) => {
        switch (rolle) {
            case 'DELTAKER':
                return <DeltakerInstruks erLaast={props.avtale.erLaast} />;
            case 'ARBEIDSGIVER':
                return <ArbeidsgiverInstruks erLaast={props.avtale.erLaast} />;
            case 'VEILEDER':
                return <VeilederInstruks />;
        }
    };

    const varsler: JSX.Element[] = props.varsler
        .filter(v => !v.lest)
        .map(v => (
            <VarselKomponent
                kanLukkes={true}
                onLukkVarsel={() => props.settVarselTilLest(v.id)}
                type={'info'}
                key={v.id}
                className={cls.element('varsel')}
            >
                <div>
                    <div className={cls.element('varsel__tekst')}>
                        {v.varslingstekst}
                    </div>
                    {v.tidspunkt && (
                        <div className={cls.element('svak')}>
                            {moment(v.tidspunkt).fromNow()}
                        </div>
                    )}
                </div>
            </VarselKomponent>
        ));

    const tilbakeTilOversiktKlikk = async () => {
        if (props.harUlagredeEndringer()) {
            try {
                await props.lagreAvtale();
            } catch (error) {
                if (error instanceof ApiError) {
                    props.visFeilmelding(error.message);
                } else {
                    throw error;
                }
            }
        }
    };

    return (
        <AvtaleFetcher
            avtaleId={props.match.params.avtaleId}
            render={() => {
                let innhold: ReactNode;
                if (!aktivtSteg) {
                    return null;
                } else if (props.avtale.erLaast || props.avtale.avbrutt) {
                    innhold = (
                        <div className="avtaleside__innhold">
                            <div className="tilbaketiloversikt">
                                <TilbakeTilOversiktLenke />
                            </div>
                            {varsler}
                            <AlertStripe
                                className={cls.element('banner')}
                                type={
                                    props.avtale.erLaast
                                        ? 'suksess'
                                        : 'advarsel'
                                }
                            >
                                {props.avtale.erLaast &&
                                    'Avtalen er godkjent av alle parter og låst.'}
                                {props.avtale.avbrutt &&
                                    'Avtalen er avbrutt av veileder og låst.'}
                            </AlertStripe>
                            <OppsummeringArbeidstrening
                                avtale={props.avtale}
                                rolle={props.rolle}
                            />
                            <Innholdsboks className={cls.element('infoboks')}>
                                {instruks(props.rolle)}
                            </Innholdsboks>
                        </div>
                    );
                } else if (props.rolle === 'DELTAKER') {
                    setAktivtSteg(finnSteg('godkjenning'));
                    innhold = (
                        <div className="avtaleside__innhold">
                            <div className="tilbaketiloversikt">
                                <TilbakeTilOversiktLenke />
                            </div>
                            {varsler}
                            <AlertStripe
                                className={cls.element('banner')}
                                type="info"
                            >
                                Du kan ikke redigere teksten i avtalen på grunn
                                av hensyn til personvern. Ta kontakt med din
                                veileder hvis du har spørsmål til innholdet i
                                avtalen.
                            </AlertStripe>
                            {aktivtSteg.komponent}
                        </div>
                    );
                } else if (erDesktop) {
                    innhold = (
                        <DesktopAvtaleSide
                            avtaleSteg={avtaleSteg}
                            aktivtSteg={aktivtSteg}
                            rolle={props.rolle}
                            avtale={props.avtale}
                            varsler={varsler}
                            avbrytAvtale={props.avbryt}
                            tilbakeTilOversiktKlikk={tilbakeTilOversiktKlikk}
                        />
                    );
                } else {
                    innhold = (
                        <MobilAvtaleSide
                            avtaleSteg={avtaleSteg}
                            rolle={props.rolle}
                            varsler={varsler}
                            tilbakeTilOversiktKlikk={tilbakeTilOversiktKlikk}
                        />
                    );
                }

                return (
                    <>
                        <Banner tekst="Avtale om arbeidstrening" />
                        <div className="avtaleside">{innhold}</div>
                    </>
                );
            }}
        />
    );
};

export default medContext(AvtaleSide);

import moment from 'moment';
import AlertStripe from 'nav-frontend-alertstriper';
import * as React from 'react';
import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Context, medContext, Rolle } from '../AvtaleContext';
import Banner from '../komponenter/Banner/Banner';
import Innholdsboks from '../komponenter/Innholdsboks/Innholdsboks';
import VarselKomponent from '../komponenter/Varsel/VarselKomponent';
import BEMHelper from '../utils/bem';
import ArbeidsoppgaverSteg from './ArbeidsoppgaverSteg/ArbeidsoppgaverSteg';
import ArbeidstidSteg from './ArbeidstidSteg/ArbeidstidSteg';
import AvtaleFetcher from './AvtaleFetcher';
import './AvtaleSide.less';
import DesktopAvtaleSide from './DesktopAvtaleSide/DesktopAvtaleSide';
import GodkjenningSteg from './GodkjenningSteg/GodkjenningSteg';
import ArbeidsgiverInstruks from './GodkjenningSteg/Oppsummering/instruks/ArbeidsgiverInstruks';
import DeltakerInstruks from './GodkjenningSteg/Oppsummering/instruks/DeltakerInstruks';
import VeilederInstruks from './GodkjenningSteg/Oppsummering/instruks/VeilederInstruks';
import Oppsummering from './GodkjenningSteg/Oppsummering/oppsummering/Oppsummering';
import KontaktinfoSteg from './KontaktInformasjonSteg/KontaktinfoSteg';
import MaalSteg from './MaalSteg/MaalSteg';
import MobilAvtaleSide from './MobilAvtaleSide/MobilAvtaleSide';
import OppfolgingSteg from './OppfolgingSteg/OppfolgingSteg';
import TilbakeTilOversiktLenke from './TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import TilretteleggingSteg from './TilretteleggingSteg/TilretteleggingSteg';

interface MatchProps {
    avtaleId: string;
    stegPath: string;
}

const cls = BEMHelper('avtaleside');

type Props = RouteComponentProps<MatchProps> & Context;

export interface StegInfo {
    komponent: React.ReactNode;
    label: string;
    id: string;
}

const AvtaleSide: FunctionComponent<Props> = props => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    const handleWindowSize = () => {
        setWindowSize(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowSize);
        return () => window.removeEventListener('resize', handleWindowSize);
    });

    const avtaleSteg: StegInfo[] = [
        {
            komponent: <KontaktinfoSteg {...props} />,
            label: 'Kontaktinformasjon',
            id: 'kontaktinformasjon',
        },
        {
            komponent: <MaalSteg {...props} />,
            label: 'Mål',
            id: 'maal',
        },
        {
            komponent: <ArbeidsoppgaverSteg {...props} />,
            label: 'Arbeidsoppgaver',
            id: 'arbeidsoppgaver',
        },
        {
            komponent: <ArbeidstidSteg />,
            label: 'Arbeidstid',
            id: 'arbeidstid',
        },
        {
            komponent: <OppfolgingSteg />,
            label: 'Oppfølging',
            id: 'oppfolging',
        },
        {
            komponent: <TilretteleggingSteg />,
            label: 'Tilrettelegging',
            id: 'tilrettelegging',
        },
        {
            komponent: <GodkjenningSteg />,
            label: 'Godkjenning',
            id: 'godkjenning',
        },
    ];

    const erDesktop = windowSize > 767;
    const aktivtSteg = avtaleSteg.find(
        steg => steg.id === props.match.params.stegPath
    );
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
                        {v.varslingstekst}{' '}
                    </div>
                    {v.tidspunkt && (
                        <div className={cls.element('svak')}>
                            {moment(v.tidspunkt).fromNow()}
                        </div>
                    )}
                </div>
            </VarselKomponent>
        ));

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
                            <Oppsummering
                                avtale={props.avtale}
                                rolle={props.rolle}
                            />
                            <Innholdsboks className={cls.element('infoboks')}>
                                {instruks(props.rolle)}
                            </Innholdsboks>
                        </div>
                    );
                } else if (props.rolle === 'DELTAKER') {
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
                            <GodkjenningSteg />
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
                        />
                    );
                } else {
                    innhold = (
                        <MobilAvtaleSide
                            avtaleSteg={avtaleSteg}
                            rolle={props.rolle}
                            varsler={varsler}
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

export default medContext<Props>(AvtaleSide);

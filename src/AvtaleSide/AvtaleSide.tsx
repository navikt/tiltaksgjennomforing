import * as React from 'react';
import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Context, medContext } from '../AvtaleContext';
import Banner from '../komponenter/Banner/Banner';
import ArbeidsoppgaverSteg from './ArbeidsoppgaverSteg/ArbeidsoppgaverSteg';
import ArbeidstidSteg from './ArbeidstidSteg/ArbeidstidSteg';
import AvtaleFetcher from './AvtaleFetcher';
import './AvtaleSide.less';
import DesktopAvtaleSide from './DesktopAvtaleSide/DesktopAvtaleSide';
import GodkjenningSteg from './GodkjenningSteg/GodkjenningSteg';
import Oppsummering from './GodkjenningSteg/Oppsummering/oppsummering/Oppsummering';
import KontaktinfoSteg from './KontaktInformasjonSteg/KontaktinfoSteg';
import MaalSteg from './MaalSteg/MaalSteg';
import MobilAvtaleSide from './MobilAvtaleSide/MobilAvtaleSide';
import OppfolgingSteg from './OppfolgingSteg/OppfolgingSteg';
import TilretteleggingSteg from './TilretteleggingSteg/TilretteleggingSteg';

interface MatchProps {
    avtaleId: string;
    stegPath: string;
}

type Props = RouteComponentProps<MatchProps> & Context;

interface StegInfo {
    komponent: React.ReactNode;
    label: string;
}

export interface AvtaleStegType {
    [key: string]: StegInfo;
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

    const avtaleSteg: AvtaleStegType = {
        kontaktinformasjon: {
            komponent: <KontaktinfoSteg {...props} />,
            label: 'Kontaktinformasjon',
        },
        maal: {
            komponent: <MaalSteg />,
            label: 'Mål',
        },
        arbeidsoppgaver: {
            komponent: <ArbeidsoppgaverSteg />,
            label: 'Arbeidsoppgaver',
        },
        arbeidstid: {
            komponent: <ArbeidstidSteg />,
            label: 'Arbeidstid',
        },
        oppfolging: {
            komponent: <OppfolgingSteg />,
            label: 'Oppfølging',
        },
        tilrettelegging: {
            komponent: <TilretteleggingSteg />,
            label: 'Tilrettelegging',
        },
        godkjenning: {
            komponent: <GodkjenningSteg />,
            label: 'Godkjenning',
        },
    };

    const erDesktop = windowSize > 767;
    const aktivtSteg = props.match.params.stegPath;

    return (
        <AvtaleFetcher
            avtaleId={props.match.params.avtaleId}
            render={() => {
                let innhold: ReactNode;
                if (props.avtale.erLaast) {
                    innhold = (
                        <div className="avtaleside__innhold">
                            <Oppsummering avtale={props.avtale} />
                        </div>
                    );
                } else if (props.rolle === 'DELTAKER') {
                    innhold = (
                        <div className="avtaleside__innhold">
                            <GodkjenningSteg />
                        </div>
                    );
                } else if (erDesktop) {
                    innhold = (
                        <DesktopAvtaleSide
                            avtaleSteg={avtaleSteg}
                            aktivtSteg={aktivtSteg}
                        />
                    );
                } else {
                    innhold = <MobilAvtaleSide avtaleSteg={avtaleSteg} />;
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

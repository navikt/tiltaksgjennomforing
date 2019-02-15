import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ApiError from '../api-error';
import { Context, medContext } from '../AvtaleContext';
import Banner from '../komponenter/Banner/Banner';
import { pathTilGodkjenningsSteg } from '../paths';
import ArbeidsoppgaverSteg from './ArbeidsoppgaverSteg/ArbeidsoppgaverSteg';
import ArbeidstidSteg from './ArbeidstidSteg/ArbeidstidSteg';
import './AvtaleSide.less';
import DesktopAvtaleSide from './DesktopAvtaleSide/DesktopAvtaleSide';
import GodkjenningSteg from './GodkjenningSteg/GodkjenningSteg';
import KontaktinfoSteg from './KontaktInformasjonSteg/KontaktinfoSteg';
import MaalSteg from './MaalSteg/MaalSteg';
import MobilAvtaleSide from './MobilAvtaleSide/MobilAvtaleSide';
import OppfolgingSteg from './OppfolgingSteg/OppfolgingSteg';
import TilretteleggingSteg from './TilretteleggingSteg/TilretteleggingSteg';

interface State {
    windowSize: number;
}

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

class AvtaleSide extends React.Component<Props, State> {
    state = {
        windowSize: window.innerWidth,
    };

    avtaleSteg: AvtaleStegType = {
        kontaktinformasjon: {
            komponent: <KontaktinfoSteg {...this.props} />,
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

    handleWindowSize = () => {
        this.setState({
            windowSize: window.innerWidth,
        });
    };

    async componentDidMount() {
        window.addEventListener('resize', this.handleWindowSize);
        const avtaleId = this.props.match.params.avtaleId;
        try {
            await Promise.all([
                this.props.hentAvtale(avtaleId),
                this.props.hentRolle(avtaleId),
            ]);
        } catch (error) {
            if (error instanceof ApiError) {
                this.props.visFeilmelding(error.message);
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSize);
    }

    componentDidUpdate() {
        this.redirectTilGodkjenningsStegHvisDeltaker();
    }

    redirectTilGodkjenningsStegHvisDeltaker = () => {
        const skalKunSeGodkjenningsside =
            this.props.match.params.stegPath !== 'godkjenning' &&
            this.props.rolle === 'DELTAKER';

        if (skalKunSeGodkjenningsside) {
            const avtaleId = this.props.match.params.avtaleId;
            this.props.history.push(pathTilGodkjenningsSteg(avtaleId));
        }
    };

    render() {
        const erDesktop = this.state.windowSize > 767;
        const aktivtSteg = this.props.match.params.stegPath;
        const skalViseStegmeny =
            this.props.rolle === 'ARBEIDSGIVER' ||
            this.props.rolle === 'VEILEDER';

        return (
            <>
                <Banner tekst="Avtale om arbeidstrening" />
                <div className="avtaleside">
                    {erDesktop ? (
                        <DesktopAvtaleSide
                            avtaleSteg={this.avtaleSteg}
                            aktivtSteg={aktivtSteg}
                            skalViseStegmeny={skalViseStegmeny}
                        />
                    ) : (
                        <MobilAvtaleSide
                            avtaleSteg={this.avtaleSteg}
                            skalViseEkspanderbartPanel={skalViseStegmeny}
                        />
                    )}
                </div>
            </>
        );
    }
}

export default medContext<Props>(AvtaleSide);

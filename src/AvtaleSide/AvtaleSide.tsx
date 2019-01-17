import * as React from 'react';
import { Context, medContext } from '../AvtaleContext';
import KontaktinfoSteg from './KontaktInformasjonSteg/KontaktinfoSteg';
import MaalSteg from './MaalSteg/MaalSteg';
import { RouteComponentProps } from 'react-router';
import ArbeidsoppgaverSteg from './ArbeidsoppgaverSteg/ArbeidsoppgaverSteg';
import ArbeidstidSteg from './ArbeidstidSteg/ArbeidstidSteg';
import OppfolgingSteg from './OppfolgingSteg/OppfolgingSteg';
import GodkjenningSteg from './GodkjenningSteg/GodkjenningSteg';
import './AvtaleSide.less';
import DesktopVersjon from './DesktopVersjon/DesktopVersjon';
import MobilVersjon from './MobilVersjon/MobilVersjon';
import { pathTilGodkjenningsSteg } from '../paths';

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
            komponent: <KontaktinfoSteg />,
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

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSize);
        const avtaleId = this.props.match.params.avtaleId;
        this.props.hentAvtale(avtaleId);
        this.props.hentRolle(avtaleId);
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
            <div className="avtaleside">
                {erDesktop ? (
                    <DesktopVersjon
                        avtaleSteg={this.avtaleSteg}
                        aktivtSteg={aktivtSteg}
                        skalViseStegmeny={skalViseStegmeny}
                    />
                ) : (
                    <MobilVersjon
                        avtaleSteg={this.avtaleSteg}
                        skalViseEkspanderbartPanel={skalViseStegmeny}
                    />
                )}
            </div>
        );
    }
}

export default medContext<Props>(AvtaleSide);

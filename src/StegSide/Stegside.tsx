import * as React from 'react';
import Stegmeny from './Stegmeny/Stegmeny';
import { Context, medContext } from './AvtaleContext';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import KontaktinfoSteg from './KontaktInformasjonSteg/KontaktinfoSteg';
import MaalsetningSteg from './AvtaleSeksjon/MaalsetningSteg';
import { RouteComponentProps } from 'react-router';
import ArbeidsoppgaverSteg from './AvtaleSeksjon/ArbeidsoppgaverSteg';
import ArbeidstidSteg from './AvtaleSeksjon/ArbeidstidSteg/ArbeidstidSteg';
import OppfolgingSteg from './AvtaleSeksjon/OppfolgingSteg';
import BekreftelseSteg from './AvtaleSeksjon/BekreftelseSteg';
import './Stegside.less';

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

class Stegside extends React.Component<Props, State> {
    state = {
        windowSize: window.innerWidth,
    };

    avtaleSteg: AvtaleStegType = {
        kontaktinformasjon: {
            komponent: <KontaktinfoSteg />,
            label: 'Kontaktinformasjon',
        },
        maal: {
            komponent: <MaalsetningSteg />,
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
            komponent: <BekreftelseSteg />,
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
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSize);
    }

    render() {
        const erDesktop = this.state.windowSize > 767;
        const erMobil = !erDesktop;
        const aktivtSteg = this.props.match.params.stegPath;

        const desktopSide = (
            <>
                <Stegmeny steg={this.avtaleSteg} aktivtSteg={aktivtSteg} />
                <div className="stegside__innhold-desktop">
                    {this.avtaleSteg[aktivtSteg].komponent}
                </div>
            </>
        );

        const mobilSide = (
            <>
                {Object.keys(this.avtaleSteg).map(steg => (
                    <Ekspanderbartpanel tittel={this.avtaleSteg[steg].label}>
                        {this.avtaleSteg[steg].komponent}
                    </Ekspanderbartpanel>
                ))}
            </>
        );

        return (
            <div className="stegside">
                {erDesktop && desktopSide}
                {erMobil && mobilSide}
            </div>
        );
    }
}

export default medContext(Stegside);

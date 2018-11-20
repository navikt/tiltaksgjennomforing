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

interface State {
    windowSize: number;
}

interface MatchProps {
    stegPath: string;
    avtaleId: string;
}

type Props = RouteComponentProps<MatchProps> & Context;

class Stegside extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            windowSize: window.innerWidth,
        };
        this.handleWindowSize = this.handleWindowSize.bind(this);
    }

    handleWindowSize() {
        this.setState({
            windowSize: window.innerWidth,
        });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSize);
    }

    render() {
        const erDesktop = this.state.windowSize > 767;
        const erMobil = !erDesktop;

        const avtaleSteg = {
            kontaktinformasjon: {
                komponent: <KontaktinfoSteg />,
                label: 'Kontaktinformasjon',
            },
            maal: { komponent: <MaalsetningSteg />, label: 'Mål' },
            arbeidsoppgaver: {
                komponent: <ArbeidsoppgaverSteg />,
                label: 'Arbeidsoppgaver',
            },
            arbeidstid: { komponent: <ArbeidstidSteg />, label: 'Arbeidstid' },
            oppfolging: { komponent: <OppfolgingSteg />, label: 'Oppfølging' },
            godkjenning: {
                komponent: <BekreftelseSteg />,
                label: 'Godkjenning',
            },
        };

        const desktopSide = (
            <>
                <Stegmeny />
                {avtaleSteg[this.props.match.params.stegPath].komponent}
            </>
        );

        const mobilSide = (
            <>
                {Object.keys(avtaleSteg).map(steg => (
                    <Ekspanderbartpanel tittel={avtaleSteg[steg].label}>
                        {avtaleSteg[steg].komponent}
                    </Ekspanderbartpanel>
                ))}
            </>
        );

        return (
            <>
                {erDesktop && desktopSide}
                {erMobil && mobilSide}
            </>
        );
    }
}

export default medContext(Stegside);

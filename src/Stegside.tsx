import * as React from 'react';
import Stegmeny from './AvtaleSide/Stegmeny/Stegmeny';
import {
    pathTilArbeidsoppgaverSteg,
    pathTilArbeidstidSteg,
    pathTilKontaktinformasjonSteg,
    pathTilMaalSteg,
    pathTilOppfolgingSteg,
    pathTilSigneringSteg,
} from './paths';
import { Context, medContext } from './AvtaleSide/AvtaleContext';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import KontaktinfoSteg from './AvtaleSide/KontaktInformasjonSteg/KontaktinfoSteg';
import MaalsetningSteg from './AvtaleSide/AvtaleSeksjon/MaalsetningSteg';
import ArbeidsoppgaverSteg from './AvtaleSide/AvtaleSeksjon/ArbeidsoppgaverSteg';
import { Route } from 'react-router';
import ArbeidstidSteg from './AvtaleSide/AvtaleSeksjon/ArbeidstidSteg/ArbeidstidSteg';
import OppfolgingSteg from './AvtaleSide/AvtaleSeksjon/OppfolgingSteg';
import BekreftelseSteg from './AvtaleSide/AvtaleSeksjon/BekreftelseSteg';

interface State {
    windowSize: number;
}

class Stegside extends React.Component<Context, State> {
    constructor(props: Context) {
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

        const desktopSide = (
            <>
                <Stegmeny />
                <Route
                    path={pathTilKontaktinformasjonSteg(':avtaleId')}
                    exact={false}
                    component={KontaktinfoSteg}
                />
                <Route
                    path={pathTilMaalSteg(':avtaleId')}
                    exact={false}
                    component={MaalsetningSteg}
                />
                <Route
                    path={pathTilArbeidsoppgaverSteg(':avtaleId')}
                    exact={false}
                    component={ArbeidsoppgaverSteg}
                />
                <Route
                    path={pathTilArbeidstidSteg(':avtaleId')}
                    exact={false}
                    component={ArbeidstidSteg}
                />
                <Route
                    path={pathTilOppfolgingSteg(':avtaleId')}
                    exact={false}
                    component={OppfolgingSteg}
                />
                <Route
                    path={pathTilSigneringSteg(':avtaleId')}
                    exact={false}
                    component={BekreftelseSteg}
                />
            </>
        );

        const menySteg = [
            {
                label: 'Kontaktinformasjon',
                url: pathTilKontaktinformasjonSteg(this.props.avtale.id),
                innhold: <KontaktinfoSteg />,
            },
            {
                label: 'Mål',
                url: pathTilMaalSteg(this.props.avtale.id),
                innhold: <MaalsetningSteg />,
            },
            {
                label: 'Arbeidsoppgaver',
                url: pathTilArbeidsoppgaverSteg(this.props.avtale.id),
                innhold: <ArbeidsoppgaverSteg />,
            },
            {
                label: 'Dato og arbeidstid',
                url: pathTilArbeidstidSteg(this.props.avtale.id),
                innhold: <ArbeidstidSteg />,
            },
            {
                label: 'Oppfølging',
                url: pathTilOppfolgingSteg(this.props.avtale.id),
                innhold: <OppfolgingSteg />,
            },
            {
                label: 'Signering',
                url: pathTilSigneringSteg(this.props.avtale.id),
                innhold: <BekreftelseSteg />,
            },
        ];

        const mobilSide = (
            <>
                {menySteg.map(steg => (
                    <Ekspanderbartpanel tittel={steg.label}>
                        {steg.innhold}
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

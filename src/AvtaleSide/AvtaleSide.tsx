import * as React from 'react';
import Stegmeny from './Stegmeny/Stegmeny';
import { Context, medContext } from '../AvtaleContext';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import KontaktinfoSteg from './KontaktInformasjonSteg/KontaktinfoSteg';
import MaalSteg from './MaalSteg/MaalSteg';
import { RouteComponentProps } from 'react-router';
import ArbeidsoppgaverSteg from './ArbeidsoppgaverSteg/ArbeidsoppgaverSteg';
import ArbeidstidSteg from './ArbeidstidSteg/ArbeidstidSteg';
import OppfolgingSteg from './OppfolgingSteg/OppfolgingSteg';
import GodkjenningSteg from './GodkjenningSteg/GodkjenningSteg';
import './AvtaleSide.less';
import { Knapp } from 'nav-frontend-knapper';

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

    render() {
        const erDesktop = this.state.windowSize > 767;
        const erMobil = !erDesktop;
        const aktivtSteg = this.props.match.params.stegPath;
        const skalViseStegmeny =
            this.props.rolle === 'ARBEIDSGIVER' ||
            this.props.rolle === 'VEILEDER';

        const desktopSide = (
            <>
                {skalViseStegmeny && (
                    <Stegmeny steg={this.avtaleSteg} aktivtSteg={aktivtSteg} />
                )}
                <form className="avtaleside__innhold-desktop">
                    {this.avtaleSteg[aktivtSteg].komponent}
                    <Knapp
                        htmlType="button"
                        onClick={this.props.lagreAvtale}
                        className="avtaleside__lagre-knapp"
                    >
                        Lagre
                    </Knapp>
                </form>
            </>
        );

        const mobilSide = (
            <form>
                {skalViseStegmeny
                    ? Object.keys(this.avtaleSteg).map(steg => (
                          <div
                              className="avtaleside__ekspanderbart-panel"
                              key={steg}
                          >
                              <Ekspanderbartpanel
                                  tittel={this.avtaleSteg[steg].label}
                              >
                                  {this.avtaleSteg[steg].komponent}
                                  <Knapp
                                      htmlType="button"
                                      onClick={this.props.lagreAvtale}
                                      className="avtaleside__lagre-knapp"
                                  >
                                      Lagre
                                  </Knapp>
                              </Ekspanderbartpanel>
                          </div>
                      ))
                    : this.avtaleSteg.godkjenning.komponent}
            </form>
        );

        return (
            <div className="avtaleside">
                {erDesktop && desktopSide}
                {erMobil && mobilSide}
            </div>
        );
    }
}

export default medContext(AvtaleSide);

import * as React from 'react';
import { Context, medContext } from '../../AvtaleContext';
import { pathTilStegIAvtale } from '../../paths';
import { AvtaleStegType } from '../AvtaleSide';
import './NesteForrige.less';
import { Route } from 'react-router-dom';

export interface Props {
    avtaleSteg: AvtaleStegType;
    aktivtSteg: string;
}

interface State {
    currentStegNummer: number;
}

class NesteForrige extends React.Component<Context & Props, State> {
    constructor(props: Props & Context) {
        super(props);

        this.state = {
            currentStegNummer: this.updateEnthusiasm(this.props.aktivtSteg),
        };
    }

    shouldComponentUpdate(
        nextProps: Readonly<Context & Props>,
        nextState: Readonly<State>,
        nextContext: any
    ): boolean {
        if (
            this.updateEnthusiasm(nextProps.aktivtSteg) ===
            this.updateEnthusiasm(this.props.aktivtSteg)
        ) {
            return true;
        }
        return false;
    }

    getNesteStegPath = () => {
        this.props.endretSteg();
        this.updateEnthusiasm(this.props.aktivtSteg);
        if (this.props.aktivtSteg === 'godkjenning') {
            return pathTilStegIAvtale(this.props.avtale.id, this.finnSteg());
        }
        if (
            parseInt(sessionStorage.getItem('currentStegNummer') || '0', 10) < 7
        ) {
            sessionStorage.setItem(
                'currentStegNummer',
                (
                    parseInt(
                        sessionStorage.getItem('currentStegNummer') || '0',
                        10
                    ) + 1
                ).toString()
            );

            return pathTilStegIAvtale(this.props.avtale.id, this.finnSteg());
        }
    };
    getForrigeStegPath = () => {
        this.props.endretSteg();
        this.updateEnthusiasm(this.props.aktivtSteg);
        if (this.props.aktivtSteg === 'kontaktinformasjon') {
            return pathTilStegIAvtale(this.props.avtale.id, this.finnSteg());
        }
        if (
            parseInt(sessionStorage.getItem('currentStegNummer') || '0', 10) > 0
        ) {
            sessionStorage.setItem(
                'currentStegNummer',
                (
                    parseInt(
                        sessionStorage.getItem('currentStegNummer') || '0',
                        10
                    ) - 1
                ).toString()
            );
            return pathTilStegIAvtale(this.props.avtale.id, this.finnSteg());
        }
    };

    finnSteg = () => {
        switch (
            parseInt(sessionStorage.getItem('currentStegNummer') || '0', 10)
        ) {
            case 0:
                return 'kontaktinformasjon';
            case 1:
                return 'maal';
            case 2:
                return 'arbeidsoppgaver';
            case 3:
                return 'arbeidstid';
            case 4:
                return 'oppfolging';
            case 5:
                return 'tilrettelegging';
            case 6:
                return 'godkjenning';
            default:
                return 'kontaktinformasjon';
        }
    };
    /**
     * Oppdaterer 'currentStegNummer' til riktig steg nummer,
     * @param aktivSteg
     */
    updateEnthusiasm(aktivSteg: string): number {
        let stegNummer = 0;

        switch (aktivSteg) {
            case 'kontaktinformasjon': {
                sessionStorage.setItem('currentStegNummer', (0).toString());
                stegNummer = 0;
                break;
            }
            case 'maal': {
                sessionStorage.setItem('currentStegNummer', (1).toString());
                stegNummer = 1;
                break;
            }
            case 'arbeidsoppgaver': {
                sessionStorage.setItem('currentStegNummer', (2).toString());
                stegNummer = 2;
                break;
            }
            case 'arbeidstid': {
                sessionStorage.setItem('currentStegNummer', (3).toString());
                stegNummer = 3;
                break;
            }
            case 'oppfolging': {
                sessionStorage.setItem('currentStegNummer', (4).toString());
                stegNummer = 4;
                break;
            }
            case 'tilrettelegging': {
                sessionStorage.setItem('currentStegNummer', (5).toString());
                stegNummer = 5;
                break;
            }
            case 'godkjenning': {
                sessionStorage.setItem('currentStegNummer', (6).toString());
                stegNummer = 6;
                break;
            }
            default:
                sessionStorage.setItem('currentStegNummer', (0).toString());
                stegNummer = 0;
        }

        return stegNummer;
    }

    render() {
        return (
            <div className="hello">
                <div className="row ">
                    <Route
                        render={({ history }) => (
                            <button
                                type="button"
                                className="knapp knapp--flat"
                                onClick={() => {
                                    history.push(
                                        this.getForrigeStegPath() || ''
                                    );
                                }}
                                disabled={
                                    sessionStorage.getItem(
                                        'currentStegNummer'
                                    ) === '0'
                                }
                                style={
                                    sessionStorage.getItem(
                                        'currentStegNummer'
                                    ) !== '0'
                                        ? {}
                                        : { display: 'none' }
                                }
                            >
                                {sessionStorage.getItem('currentStegNummer') !==
                                '0'
                                    ? 'Forrige'
                                    : ''}
                            </button>
                        )}
                    />
                    <Route
                        render={({ history }) => (
                            <button
                                type="button"
                                className="knapp knapp--flat nesteforrige__buttontoright"
                                onClick={() => {
                                    history.push(this.getNesteStegPath() || '');
                                }}
                                disabled={
                                    sessionStorage.getItem(
                                        'currentStegNummer'
                                    ) === '6'
                                }
                                style={
                                    sessionStorage.getItem(
                                        'currentStegNummer'
                                    ) !== '6'
                                        ? {}
                                        : { display: 'none' }
                                }
                            >
                                {sessionStorage.getItem('currentStegNummer') !==
                                '6'
                                    ? 'Neste'
                                    : ''}
                            </button>
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default medContext<Props>(NesteForrige);

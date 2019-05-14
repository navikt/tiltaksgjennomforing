import * as React from 'react';
import {Context, medContext} from '../../AvtaleContext';
import {pathTilStegIAvtale} from '../../paths';
import AvtaleSide, {AvtaleStegType} from '../AvtaleSide';
import './NesteForrige.less';
import {Link} from "react-router-dom";
import {Route} from 'react-router-dom';
import {Knapp} from 'nav-frontend-knapper';


export interface Props {
    avtaleSteg: AvtaleStegType;
    aktivtSteg: string;
}

/*
interface State {
    currentEnthusiasm: number;
    // aktivSteg: string;
}
*/

// kall => props.endretSteg
// SET window.location.href => props.url


class Hello extends React.Component<Context & Props> {


    constructor(props: Props & Context) {
        super(props);
    }

    getNesteStegPath = () => {
        this.props.endretSteg();
        this.updateEnthusiasm(this.props.aktivtSteg);
        if (this.props.aktivtSteg === 'godkjenning') {
            return pathTilStegIAvtale(this.props.avtale.id, this.finnSteg())
        }
        if (parseInt(sessionStorage.getItem('currentEnthusiasm') || '0', 10) < 7) {
            sessionStorage.setItem('currentEnthusiasm', (parseInt(sessionStorage.getItem('currentEnthusiasm') || '0', 10) + 1).toString());

            return pathTilStegIAvtale(this.props.avtale.id, this.finnSteg())
        }

    };
    getForrigeStegPath = () => {
        this.props.endretSteg();
        this.updateEnthusiasm(this.props.aktivtSteg);
        if (this.props.aktivtSteg === 'kontaktinformasjon') {
            return pathTilStegIAvtale(this.props.avtale.id, this.finnSteg())
        }
        if (parseInt(sessionStorage.getItem('currentEnthusiasm') || '0', 10) > 0) {
            sessionStorage.setItem('currentEnthusiasm', (parseInt(sessionStorage.getItem('currentEnthusiasm') || '0', 10) - 1).toString());
            return pathTilStegIAvtale(this.props.avtale.id, this.finnSteg())
        }
    }

    finnSteg = () => {
        switch (parseInt(sessionStorage.getItem('currentEnthusiasm') || '0', 10)) {
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
            default :
                return 'kontaktinformasjon';

        }
    };

    updateEnthusiasm(aktivSteg: string) {
        // this.setState({ currentEnthusiasm, aktivSteg});
        switch (aktivSteg) {
            case 'kontaktinformasjon': {
                sessionStorage.setItem('currentEnthusiasm', (0).toString());
                break;
            }
            case 'maal': {
                sessionStorage.setItem('currentEnthusiasm', (1).toString());
                break;
            }
            case 'arbeidsoppgaver': {
                sessionStorage.setItem('currentEnthusiasm', (2).toString());
                break;
            }
            case 'arbeidstid': {
                sessionStorage.setItem('currentEnthusiasm', (3).toString());
                break;
            }
            case 'oppfolging': {
                sessionStorage.setItem('currentEnthusiasm', (4).toString());
                break;
            }
            case 'tilrettelegging': {
                sessionStorage.setItem('currentEnthusiasm', (5).toString());
                break;
            }
            case 'godkjenning': {
                sessionStorage.setItem('currentEnthusiasm', (6).toString());
                break;
            }
            default :
                sessionStorage.setItem('currentEnthusiasm', (0).toString());

        }
// this.setState({currentEnthusiasm: })
    }

    // updateAktivSteg()

    render() {
        // const { name } = this.props;

        return (
            <div className="hello">
                <div className="row " >
                        <Route render={({history}) => (
                            <button
                                type='button'
                                className="knapp knapp--flat"
                                onClick={() => {
                                    history.push(this.getForrigeStegPath() || '')
                                }}
                            >
                                Forrige
                            </button>

                        )}/>
                        <Route render={({history}) => (
                            <button
                                type='button'
                                className="knapp knapp--flat nesteforrige__buttontoright"
                                onClick={() => {
                                    history.push(this.getNesteStegPath() || '')
                                }}
                            >
                                Neste
                            </button>
                        )}/>
                </div>
            </div>

        );
    }

    /**
     * Oppdaterer 'currentEnthusiasm' til riktig steg nummer,
     * @param aktivSteg
     */

}

export default medContext<Props>(Hello);

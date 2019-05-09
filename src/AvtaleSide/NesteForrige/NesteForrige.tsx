import * as React from 'react';
import {Context, medContext} from '../../AvtaleContext';
import {pathTilStegIAvtale} from '../../paths';
import AvtaleSide, {AvtaleStegType} from '../AvtaleSide';
import './NesteForrige.less';
import NesteForrigeLenke from './NesteForrigeLenke/NesteForrigeLenke';
import StegmenyLenke from "../Stegmeny/StegmenyLenke/StegmenyLenke";
import {Link} from "react-router-dom";
import {number} from "prop-types";
import Lenke from "nav-frontend-lenker";
import {BrowserRouter as Router, withRouter} from 'react-router-dom';

export interface Props {
    avtaleSteg: AvtaleStegType;
    aktivtSteg: string;
}

interface State {
    currentEnthusiasm: number;
    // aktivSteg: string;
}

// kall => props.endretSteg
// SET window.location.href => props.url


class Hello extends React.Component<Context & Props> {
    state = {
        currentEnthusiasm: 0
    };

    constructor(props: Props & Context) {
        super(props);
    }

    byttSteg = (nyttSteg: number) => {

        if (this.state.currentEnthusiasm < 6) {
            this.setState({
                currentEnthusiasm: nyttSteg
            }, () => {

                this.nesteSteg();
            })
        }

    };

    finnSteg = () => {
        switch (this.state.currentEnthusiasm) {
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

    nesteSteg = () => {
        // to-do oppdatere array med nytt nummer, og kalle funksjonen som oppdaterer steg komponenten.
        // Må oppdateres hvis avtleside/steg blir endret

        const steg = this.finnSteg();
        const sideBytte = pathTilStegIAvtale(this.props.avtale.id, steg);
        console.log("sideBytte", sideBytte, "avtale.id: ", this.props.avtale.id, "steg:", steg);
        sessionStorage.setItem('currentEnthusiasm', this.state.currentEnthusiasm.toString());
        window.sessionStorage.setItem('currentEnthusiasm', this.state.currentEnthusiasm.toString());
        //  window.location.replace(sideBytte);
        // window.location.pathname.replace('', sideBytte);
        // window.location.assign(sideBytte);
        // window.location.href=sideBytte;
        console.log(sessionStorage.getItem('currentEnthusiasm'));
        console.log(window.sessionStorage.getItem('currentEnthusiasm'));
        // props.history.replace(sideBytte);

    };


    getNesteSteg = () => {
        this.updateEnthusiasm(this.props.aktivtSteg);
        if (this.state.currentEnthusiasm < 6) {
            const tmp = this.state.currentEnthusiasm;
            // this.setState({currentEnthusiasm: tmp+1});
            this.state.currentEnthusiasm = this.state.currentEnthusiasm + 1;
        }
        console.log(this.state.currentEnthusiasm + ' inside getNesteSteg ');
        return pathTilStegIAvtale(this.props.avtale.id, this.finnSteg());


    };
    getForrigeSteg = () => {

        if (this.state.currentEnthusiasm > 0) {
            const tmp = this.state.currentEnthusiasm;
            // this.setState({currentEnthusiasm: tmp - 1});
            this.state.currentEnthusiasm = this.state.currentEnthusiasm + 1;
        }

        return pathTilStegIAvtale(this.props.avtale.id, this.finnSteg());
        // console.log(this.state.currentEnthusiasm+"inside forrige");


    };


    onIncrement = () => console.log(this.nesteSteg());

    //   onDecrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm - 1,this.state.aktivSteg);

    render() {
        // const { name } = this.props;

        if (false/* this.state.currentEnthusiasm <= 0*/) {
            throw new Error('You could be a little more enthusiastic. :D');
        }

        return (
            <div className="hello">

                <div className="greeting">
                    Hello { /* name + getExclamationMarks(this.state.currentEnthusiasm)+this.state.aktivSteg */}

                    {/*<button onClick={e => this.byttSteg(this.state.currentEnthusiasm-1) }   >Forrige</button>*/}

                    {/*<button onClick={this.byttSteg(this.state.currentEnthusiasm+1) }   >Neste</button>*/}
                    <button onClick={e => this.byttSteg(this.state.currentEnthusiasm + 1)}>Neste</button>

                    <div className="nesteforrige__lenke"><Link replace={true} to={'this.getNesteSteg()'}> Neste </Link>
                    </div>
                </div>
                <div>.</div>

                {/*  <div>
                    <div className="nesteforrige__lenke"><Link replace={false}
                                                               to={this.getForrigeSteg()}> Forrige </Link></div>
                </div>*/}


                {/*  <button
                    type="button"
                    onClick={() => history.replaceState(null, 'neste', this.getNesteSteg())}
                >
                    {'neste'}
                </button>*/}


            </div>

        );
    }

    /**
     * Oppdaterer 'currentEnthusiasm' til riktig steg nummer,
     * @param aktivSteg
     */
    updateEnthusiasm(aktivSteg: string) {
        // this.setState({ currentEnthusiasm, aktivSteg});
        switch (aktivSteg) {
            case 'kontaktinformasjon': {
                this.state.currentEnthusiasm = 0;
                break;
            }
            case 'maal': {
                this.state.currentEnthusiasm = 1;
                break;
            }
            case 'arbeidsoppgaver': {
                this.state.currentEnthusiasm = 2;
                break;
            }
            case 'arbeidstid': {
                this.state.currentEnthusiasm = 3;
                break;
            }
            case 'oppfolging': {
                this.state.currentEnthusiasm = 4;
                break;
            }
            case 'tilrettelegging': {
                this.state.currentEnthusiasm = 5;
                break;
            }
            case 'godkjenning':
                return;
            default :
                this.state.currentEnthusiasm = 0;

        }
// this.setState({currentEnthusiasm: })
    }

    // updateAktivSteg()
}

export default medContext<Props>(Hello);

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}
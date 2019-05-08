import * as React from 'react';
import {Context, medContext} from '../../AvtaleContext';
import {pathTilStegIAvtale} from '../../paths';
import AvtaleSide, {AvtaleStegType} from '../AvtaleSide';
import './NesteForrige.less';
import NesteForrigeLenke from './NesteForrigeLenke/NesteForrigeLenke';
import StegmenyLenke from "../Stegmeny/StegmenyLenke/StegmenyLenke";
import {Link} from "react-router-dom";

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

        if (this.state.currentEnthusiasm<6) {
            this.setState({
                currentEnthusiasm: nyttSteg
            }, () => {
                console.log(nyttSteg);
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
        console.log(sideBytte);

        // window.location.href = sideBytte;
    };

    forrigeSteg = () => {

        if (this.state.currentEnthusiasm<0){
            this.state.currentEnthusiasm--;
        }

       return this.finnSteg();

    }


    onIncrement = () => console.log( this.nesteSteg());
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
                </div>
                <button onClick={e => this.byttSteg(this.state.currentEnthusiasm-1) } >Forrige</button>

                 {/*<button onClick={this.byttSteg(this.state.currentEnthusiasm+1) }   >Neste</button>*/}
                 <button onClick={e => this.byttSteg(this.state.currentEnthusiasm+1) }   >Neste</button>
            </div>
        );
    }

 updateEnthusiasm(currentEnthusiasm: number,aktivSteg: string) {
        // this.setState({ currentEnthusiasm, aktivSteg});

    }
    getForrigeSteg(aktivSteg: string){
//        let indexOfAktivSteg= new AvtaleSide().avtaleSteg<Props.nextNode()
//         myAvtaleSide : AvtaleSide;
//         medContext(AvtaleSide).
//         let myListSteg= myAvtaleSide.avtaleSteg<Object>
//         return pathTilStegIAvtale(props.avtale.id,'')
    }
    // updateAktivSteg()
}

export default medContext<Props>(Hello);

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}
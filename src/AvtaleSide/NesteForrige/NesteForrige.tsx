import * as React from 'react';
import {Context, medContext} from '../../AvtaleContext';
import {pathTilStegIAvtale} from '../../paths';
import AvtaleSide, {AvtaleStegType} from '../AvtaleSide';
import './NesteForrige.less';
import NesteForrigeLenke from './NesteForrigeLenke/NesteForrigeLenke';
import {object} from "prop-types";
/*
interface Props {
    steg: AvtaleStegType;
    aktivtSteg: string;

}

/!*const NesteForrige = (props: Context & Props) => {
    const nesteforrigeLenker = Object.keys(props.steg).map(key => (
        <NesteForrigeLenke
            label={props.steg[key].label}
            aktiv={props.aktivtSteg === key}
            ferdig={false}
            url={pathTilStegIAvtale(props.avtale.id, key)}
            key={key}

        />
    ));*!/
    const NesteForrige = (props: Context & Props) => {
        const nesteforrigeLenker = Object.keys(props.steg).map(key => (
            <NesteForrigeLenke
                label={props.steg[key].toString()}
                aktiv={props.aktivtSteg === key}
                ferdig={false}
                url={pathTilStegIAvtale(props.avtale.id, key)}
                key={key}

            />
        ));

    return <nav className="nesteforrige">{nesteforrigeLenker}</nav>;
};*/

//export default medContext<Props>(NesteForrige);


export interface Props {
    name: string;
    enthusiasmLevel?: number;
    steg?: AvtaleStegType;

    aktivtSteg?: string;
    nesteSteg?: string;
    forrigeSteg?: string;
}

interface State {
    currentEnthusiasm: number;
    aktivSteg: string;
}

class Hello extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { currentEnthusiasm: props.enthusiasmLevel || 1, aktivSteg: props.aktivtSteg || 'maal'};

    }

    onIncrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm + 1,'arbeidsoppgaver');
    onDecrement = () => this.updateEnthusiasm(this.state.currentEnthusiasm - 1,this.state.aktivSteg);

    render() {
        const { name } = this.props;

        if (this.state.currentEnthusiasm <= 0) {
            throw new Error('You could be a little more enthusiastic. :D');
        }

        return (
            <div className="hello">
                <div className="greeting">
                    Hello {name + getExclamationMarks(this.state.currentEnthusiasm)+this.state.aktivSteg}
                </div>
                <button
                        // aktiv={true}
                        // ferdig={false}
                        // url={pathTilStegIAvtale(props.avtale.id, 'maal')}
                        // key={key}
                        onClick={this.onDecrement}>Forrige</button>

                <button onClick={this.onIncrement}>Neste</button>
            </div>
        );
    }

    updateEnthusiasm(currentEnthusiasm: number,aktivSteg: string) {
        this.setState({ currentEnthusiasm, aktivSteg});

    }
    getForrigeSteg(aktivSteg: string){
//        let indexOfAktivSteg= new AvtaleSide().avtaleSteg<Props.nextNode()
//         myAvtaleSide : AvtaleSide;
//         medContext(AvtaleSide).
//         let myListSteg= myAvtaleSide.avtaleSteg<Object>
//         return pathTilStegIAvtale(props.avtale.id,'')
    }
    //updateAktivSteg()
}

export default Hello;

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}
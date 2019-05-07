import React from 'react';
import { AvtaleStegType } from '../AvtaleSide';
import Stegmeny from '../Stegmeny/Stegmeny';
import NesteForrige from "../NesteForrige/NesteForrige";
import Hello from "../NesteForrige/NesteForrige";

interface Props {
    avtaleSteg: AvtaleStegType;
    aktivtSteg: string;
}

const DesktopAvtaleSide: React.FunctionComponent<Props> = props => (
    <>
        <Stegmeny steg={props.avtaleSteg} aktivtSteg={props.aktivtSteg} />
        <form className="avtaleside__innhold">
            {props.avtaleSteg[props.aktivtSteg].komponent}
        </form>
        <Hello name={"myhellotest"}/>
    </>
);
export default DesktopAvtaleSide;

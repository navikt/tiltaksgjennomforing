import React from 'react';
import { AvtaleStegType } from '../AvtaleSide';
import Stegmeny from '../Stegmeny/Stegmeny';

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
    </>
);
export default DesktopAvtaleSide;

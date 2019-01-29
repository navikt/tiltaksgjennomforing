import React from 'react';
import { AvtaleStegType } from '../AvtaleSide';
import Stegmeny from '../Stegmeny/Stegmeny';

interface Props {
    avtaleSteg: AvtaleStegType;
    aktivtSteg: string;
    skalViseStegmeny: boolean;
}

const DesktopAvtaleSide: React.FunctionComponent<Props> = props => {
    const stegmeny = (
        <Stegmeny steg={props.avtaleSteg} aktivtSteg={props.aktivtSteg} />
    );

    return (
        <>
            {props.skalViseStegmeny && stegmeny}
            <form className="avtaleside__innhold-desktop">
                {props.avtaleSteg[props.aktivtSteg].komponent}
            </form>
        </>
    );
};

export default DesktopAvtaleSide;

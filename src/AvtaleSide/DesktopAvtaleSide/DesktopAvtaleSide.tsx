import React from 'react';
import Stegmeny from '../Stegmeny/Stegmeny';
import { Knapp } from 'nav-frontend-knapper';
import { AvtaleStegType } from '../AvtaleSide';
import { Context, medContext } from '../../AvtaleContext';

interface Props {
    avtaleSteg: AvtaleStegType;
    aktivtSteg: string;
    skalViseStegmeny: boolean;
}

const DesktopAvtaleSide: React.FunctionComponent<Props & Context> = props => {
    const stegmeny = (
        <Stegmeny steg={props.avtaleSteg} aktivtSteg={props.aktivtSteg} />
    );

    return (
        <>
            {props.skalViseStegmeny && stegmeny}
            <form className="avtaleside__innhold-desktop">
                {props.avtaleSteg[props.aktivtSteg].komponent}
                <Knapp
                    htmlType="button"
                    onClick={props.lagreAvtale}
                    className="avtaleside__lagre-knapp"
                >
                    Lagre
                </Knapp>
            </form>
        </>
    );
};

export default medContext<Props>(DesktopAvtaleSide);

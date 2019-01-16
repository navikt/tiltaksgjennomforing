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

const DesktopVersjon: React.FunctionComponent<Props & Context> = props => {
    return (
        <>
            {props.skalViseStegmeny && (
                <Stegmeny
                    steg={props.avtaleSteg}
                    aktivtSteg={props.aktivtSteg}
                />
            )}
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

export default medContext<Props>(DesktopVersjon);

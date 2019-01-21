import React from 'react';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';
import { Context, medContext } from '../../AvtaleContext';
import { AvtaleStegType } from '../AvtaleSide';

interface Props {
    avtaleSteg: AvtaleStegType;
    skalViseEkspanderbartPanel: boolean;
}

const MobilAvtaleSide: React.FunctionComponent<Props & Context> = props => {
    const ekspanderbartPanel = Object.keys(props.avtaleSteg).map(steg => (
        <div className="avtaleside__ekspanderbart-panel" key={steg}>
            <Ekspanderbartpanel tittel={props.avtaleSteg[steg].label}>
                {props.avtaleSteg[steg].komponent}
                <Knapp
                    htmlType="button"
                    onClick={props.lagreAvtale}
                    className="avtaleside__lagre-knapp"
                >
                    Lagre
                </Knapp>
            </Ekspanderbartpanel>
        </div>
    ));

    return (
        <form>
            {props.skalViseEkspanderbartPanel
                ? ekspanderbartPanel
                : props.avtaleSteg.godkjenning.komponent}
        </form>
    );
};

export default medContext<Props>(MobilAvtaleSide);

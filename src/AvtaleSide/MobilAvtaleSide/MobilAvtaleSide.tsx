import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import { AvtaleStegType } from '../AvtaleSide';

interface Props {
    avtaleSteg: AvtaleStegType;
    skalViseEkspanderbartPanel: boolean;
}

const MobilAvtaleSide: React.FunctionComponent<Props> = props => {
    const ekspanderbartPanel = Object.keys(props.avtaleSteg).map(steg => (
        <div className="avtaleside__ekspanderbart-panel" key={steg}>
            <Ekspanderbartpanel tittel={props.avtaleSteg[steg].label}>
                {props.avtaleSteg[steg].komponent}
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

export default MobilAvtaleSide;

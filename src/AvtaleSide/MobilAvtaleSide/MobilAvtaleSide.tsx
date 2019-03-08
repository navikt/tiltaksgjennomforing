import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import { AvtaleStegType } from '../AvtaleSide';

interface Props {
    avtaleSteg: AvtaleStegType;
}

const MobilAvtaleSide: React.FunctionComponent<Props> = props => {
    const ekspanderbartPanel = Object.keys(props.avtaleSteg).map(steg => (
        <div className="avtaleside__ekspanderbart-panel" key={steg}>
            <Ekspanderbartpanel tittel={props.avtaleSteg[steg].label}>
                {props.avtaleSteg[steg].komponent}
            </Ekspanderbartpanel>
        </div>
    ));

    return <form>{ekspanderbartPanel}</form>;
};

export default MobilAvtaleSide;

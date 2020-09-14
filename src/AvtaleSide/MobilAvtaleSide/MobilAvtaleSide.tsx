import { Rolle } from '@/AvtaleContext';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import React from 'react';
import { StegInfo } from '../AvtaleSide';
import OppgaveLinje from '@/AvtaleSide/Oppgavelinje/Oppgavelinje';

interface Props {
    avtaleSteg: StegInfo[];
    rolle: Rolle;
    varsler?: JSX.Element[];
}

const MobilAvtaleSide: React.FunctionComponent<Props> = props => {
    const ekspanderbartPanel = props.avtaleSteg.map(steg => (
        <div className="avtaleside__ekspanderbart-panel" key={steg.id}>
            <Ekspanderbartpanel tittel={steg.label}>{steg.komponent}</Ekspanderbartpanel>
        </div>
    ));

    return (
        <>
            <OppgaveLinje enableScreenSizeCheck={true} />
            {props.varsler}
            <form>{ekspanderbartPanel}</form>
        </>
    );
};

export default MobilAvtaleSide;

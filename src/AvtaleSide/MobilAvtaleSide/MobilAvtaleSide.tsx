import OppgaveLinje from '@/AvtaleSide/Oppgavelinje/Oppgavelinje';
import { Rolle } from '@/types/innlogget-bruker';
import { Accordion } from '@navikt/ds-react';

import React from 'react';
import { StegInfo } from '../AvtaleSide';

interface Props {
    avtaleSteg: StegInfo[];
    rolle: Rolle;
}

const MobilAvtaleSide: React.FunctionComponent<Props> = (props) => {
    const ekspanderbartPanel = props.avtaleSteg.map((steg) => (
        <div className="avtaleside__ekspanderbart-panel" key={steg.id}>
            <Accordion style={{ border: '1px solid #c6c2bf' }}>
                <Accordion.Item>
                    <Accordion.Header style={{ backgroundColor: 'white' }}>{steg.label}</Accordion.Header>
                    <Accordion.Content>{steg.komponent}</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    ));

    return (
        <>
            <OppgaveLinje />
            <form>{ekspanderbartPanel}</form>
        </>
    );
};

export default MobilAvtaleSide;

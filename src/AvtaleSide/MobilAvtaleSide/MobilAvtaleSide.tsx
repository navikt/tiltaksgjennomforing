import OppgaveLinje from '@/AvtaleSide/Oppgavelinje/Oppgavelinje';
import { Rolle } from '@/types/innlogget-bruker';
import { Accordion } from '@navikt/ds-react';
import React from 'react';
import { StegInfo } from '../AvtaleSide';

interface Props {
    avtaleSteg: StegInfo[];
    rolle: Rolle;
    avtaleId: string;
}

const MobilAvtaleSide: React.FunctionComponent<Props> = (props) => {
    const ekspanderbartPanel = props.avtaleSteg.map((steg) => (
        <div role="main" className="avtaleside__ekspanderbart-panel" key={steg.id}>
            <Accordion className="accordion">
                <Accordion.Item>
                    <Accordion.Header>{steg.label}</Accordion.Header>
                    <Accordion.Content>{steg.komponent}</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    ));

    return (
        <>
            <OppgaveLinje />
            {ekspanderbartPanel}
        </>
    );
};

export default MobilAvtaleSide;

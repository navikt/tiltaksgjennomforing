import OppgaveLinje from '@/AvtaleSide/Oppgavelinje/Oppgavelinje';
import { ExpansionCard } from '@navikt/ds-react';
import React from 'react';
import styles from './MobilAvtaleSide.module.less';
import { StegInfo } from '../AvtaleSide';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';

interface Props {
    avtaleSteg: StegInfo[];
    avtaleNr: number;
    sidetittel: string;
}

const MobilAvtaleSide: React.FunctionComponent<Props> = (props) => {
    const ekspanderbartPanel = props.avtaleSteg.map((steg) => (
        <ExpansionCard key={steg.id} size="small" aria-label={steg.label} className={styles.ekspanderbartPanel}>
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h2" size="small">
                    {steg.label}
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content className={styles.panelInnhold}>{steg.komponent}</ExpansionCard.Content>
        </ExpansionCard>
    ));

    return (
        <>
            <BannerNAVAnsatt tekst={props.sidetittel} undertittel={`Avtalenummer: ${props.avtaleNr}`} />
            <OppgaveLinje />
            {ekspanderbartPanel}
        </>
    );
};

export default MobilAvtaleSide;

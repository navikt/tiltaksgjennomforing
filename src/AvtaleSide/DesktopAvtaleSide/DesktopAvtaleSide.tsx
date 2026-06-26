import OppgaveLinje from '@/AvtaleSide/Oppgavelinje/Oppgavelinje';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';
import { Avtale } from '@/types/avtale';
import { Rolle } from '@/types/innlogget-bruker';
import React from 'react';
import { StegInfo } from '../AvtaleSide';
import NesteForrige from '../NesteForrige/NesteForrige';
import Stegmeny from '../Stegmeny/Stegmeny';
import styles from './DesktopAvtaleSide.module.less';

interface Props {
    avtaleSteg: StegInfo[];
    aktivtSteg: StegInfo;
    rolle: Rolle;
    avtale: Avtale;
    sidetittel: string;
}

const DesktopAvtaleSide: React.FunctionComponent<Props> = (props) => {
    return (
        <>
            <div className={styles.desktop}>
                <BannerNAVAnsatt tekst={props.sidetittel} undertittel={`Avtalenummer: ${props.avtale.avtaleNr}`} />
                <OppgaveLinje />
                <div className={styles.container}>
                    <Stegmeny steg={props.avtaleSteg} aktivtSteg={props.aktivtSteg} />
                    <div className={styles.innhold}>
                        {props.aktivtSteg.komponent}
                        <NesteForrige avtaleSteg={props.avtaleSteg} aktivtSteg={props.aktivtSteg} />
                    </div>
                </div>
            </div>
        </>
    );
};
export default DesktopAvtaleSide;

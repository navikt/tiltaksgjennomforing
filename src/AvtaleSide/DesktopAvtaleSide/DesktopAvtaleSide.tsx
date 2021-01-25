import OppgaveLinje from '@/AvtaleSide/Oppgavelinje/Oppgavelinje';
import { Avtale } from '@/types/avtale';
import { Rolle } from '@/types/innlogget-bruker';
import BEMHelper from '@/utils/bem';
import React from 'react';
import { StegInfo } from '../AvtaleSide';
import NesteForrige from '../NesteForrige/NesteForrige';
import Stegmeny from '../Stegmeny/Stegmeny';
import BannerNAVAnsatt from '@/komponenter/Banner/BannerNAVAnsatt';

interface Props {
    avtaleSteg: StegInfo[];
    aktivtSteg: StegInfo;
    rolle: Rolle;
    avtale: Avtale;
    sidetittel: string;
}

const cls = BEMHelper('avtaleside');
const DesktopAvtaleSide: React.FunctionComponent<Props> = props => {
    return (
        <>
            <div className={cls.element('desktop')}>
                <BannerNAVAnsatt tekst={props.sidetittel} />
                <OppgaveLinje enableScreenSizeCheck={true} />
                <div className={cls.element('container')}>
                    <Stegmeny steg={props.avtaleSteg} aktivtSteg={props.aktivtSteg} />
                    <div className={cls.element('innhold')}>
                        {props.aktivtSteg.komponent}
                        <NesteForrige avtaleSteg={props.avtaleSteg} aktivtSteg={props.aktivtSteg} />
                    </div>
                </div>
            </div>
        </>
    );
};
export default DesktopAvtaleSide;

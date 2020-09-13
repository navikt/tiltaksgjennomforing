import { Rolle } from '@/AvtaleContext';
import { Avtale } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import React from 'react';
import { StegInfo } from '../AvtaleSide';
import NesteForrige from '../NesteForrige/NesteForrige';
import Stegmeny from '../Stegmeny/Stegmeny';
import OppgaveLinje from '@/AvtaleSide/Oppgavelinje/Oppgavelinje';

interface Props {
    avtaleSteg: StegInfo[];
    aktivtSteg: StegInfo;
    rolle: Rolle;
    varsler?: JSX.Element[];
    avtale: Avtale;
}

const cls = BEMHelper('avtaleside');
const DesktopAvtaleSide: React.FunctionComponent<Props> = props => {
    return (
        <>
            <div className={cls.element('desktop')}>
                {props.varsler}
                <OppgaveLinje />
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

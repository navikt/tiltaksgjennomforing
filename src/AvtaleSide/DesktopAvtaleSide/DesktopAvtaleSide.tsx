import { Rolle } from '@/AvtaleContext';
import AvbrytAvtaleModal from '@/komponenter/modal/AvbrytAvtaleModal';
import { Avtale } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import React, { useState } from 'react';
import AvbryteAvtalen from '../AvbryteAvtalen/AvbryteAvtalen';
import { StegInfo } from '../AvtaleSide';
import DelLenkeTilAvtalen from '../DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import Hendelselogg from '../Hendelselogg/Hendelselogg';
import NesteForrige from '../NesteForrige/NesteForrige';
import Stegmeny from '../Stegmeny/Stegmeny';
import TilbakeTilOversiktLenke from '../TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';

interface Props {
    avtaleSteg: StegInfo[];
    aktivtSteg: StegInfo;
    rolle: Rolle;
    avtale: Avtale;
    avbrytAvtale: (avbruttDato: string, avbruttGrunn: string) => Promise<void>;
    tilbakeTilOversiktKlikk: () => void;
}

const cls = BEMHelper('avtaleside');
const DesktopAvtaleSide: React.FunctionComponent<Props> = props => {
    const bekreftelseAvbrytAvtalen = () => {
        setModalIsOpen(true);
    };
    const lukkModal = () => {
        setModalIsOpen(false);
    };
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <div className={cls.element('desktop')}>
                <div className={cls.element('lenkerlinje')}>
                    <TilbakeTilOversiktLenke onClick={props.tilbakeTilOversiktKlikk} />
                    <div className={cls.element('avbrytOgDelLenk')}>
                        <Hendelselogg />
                        {props.avtale.kanAvbrytes && !props.avtale.avbrutt && props.rolle === 'VEILEDER' && (
                            <AvbryteAvtalen avbrytOnclick={bekreftelseAvbrytAvtalen} />
                        )}
                        {props.rolle === 'VEILEDER' && <DelLenkeTilAvtalen />}
                    </div>
                </div>
                <div className={cls.element('container')}>
                    <Stegmeny steg={props.avtaleSteg} aktivtSteg={props.aktivtSteg} />
                    <div className={cls.element('innhold')}>
                        {props.aktivtSteg.komponent}
                        <NesteForrige avtaleSteg={props.avtaleSteg} aktivtSteg={props.aktivtSteg} />
                    </div>
                </div>
            </div>

            <AvbrytAvtaleModal isOpen={modalIsOpen} lukkModal={lukkModal} avbrytAvtale={props.avbrytAvtale} />
        </>
    );
};
export default DesktopAvtaleSide;

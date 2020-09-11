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
import OvertaAvtaleModal from '@/AvtaleSide/OvertaAvtalen/OvertaAvtaleModal';
import OvertaAvtalen from '@/AvtaleSide/OvertaAvtalen/OvertaAvtalen';

interface Props {
    avtaleSteg: StegInfo[];
    aktivtSteg: StegInfo;
    rolle: Rolle;
    varsler?: JSX.Element[];
    avtale: Avtale;
    avbrytAvtale: (avbruttDato: string, avbruttGrunn: string) => Promise<void>;
    tilbakeTilOversiktKlikk: () => void;
    erNavIdenterLike: boolean;
}

const cls = BEMHelper('avtaleside');
const DesktopAvtaleSide: React.FunctionComponent<Props> = props => {
    const bekreftelseAvbrytAvtalen = () => {
        setModalIsOpen(true);
    };
    const lukkModal = () => {
        setModalIsOpen(false);
    };

    const erVeileder = props.rolle === 'VEILEDER';
    const [overtaModalIsOpen, setOvertaModalIsOpen] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <div className={cls.element('desktop')}>
                {props.varsler}
                <div className={cls.element('lenkerlinje')}>
                    <TilbakeTilOversiktLenke onClick={props.tilbakeTilOversiktKlikk} />
                    <div className={cls.element('avbrytOgDelLenk')}>
                        {erVeileder && !props.erNavIdenterLike && (
                            <OvertaAvtalen apneModal={() => setOvertaModalIsOpen(true)} />
                        )}
                        <Hendelselogg />
                        {props.avtale.kanAvbrytes && !props.avtale.avbrutt && props.rolle === 'VEILEDER' && (
                            <AvbryteAvtalen avbrytOnclick={bekreftelseAvbrytAvtalen} />
                        )}
                        {erVeileder && <DelLenkeTilAvtalen />}
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
            <OvertaAvtaleModal isOpen={overtaModalIsOpen} lukkModal={() => setOvertaModalIsOpen(false)} />
        </>
    );
};
export default DesktopAvtaleSide;

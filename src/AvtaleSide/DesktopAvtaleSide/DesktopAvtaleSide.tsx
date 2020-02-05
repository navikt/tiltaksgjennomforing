import { Rolle } from '@/AvtaleContext';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { Avtale } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import React, { useState } from 'react';
import AvbryteAvtalen from '../AvbryteAvtalen/AvbryteAvtalen';
import { StegInfo } from '../AvtaleSide';
import DelLenkeTilAvtalen from '../DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import NesteForrige from '../NesteForrige/NesteForrige';
import Stegmeny from '../Stegmeny/Stegmeny';
import TilbakeTilOversiktLenke from '../TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';

interface Props {
    avtaleSteg: StegInfo[];
    aktivtSteg: StegInfo;
    rolle: Rolle;
    varsler?: JSX.Element[];
    avtale: Avtale;
    avbrytAvtale: () => Promise<void>;
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
                {props.varsler}
                <div className={cls.element('lenkerlinje')}>
                    <TilbakeTilOversiktLenke onClick={props.tilbakeTilOversiktKlikk} />
                    <div className={cls.element('avbrytOgDelLenk')}>
                        {' '}
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
            <BekreftelseModal
                modalIsOpen={modalIsOpen}
                bekreftOnClick={props.avbrytAvtale}
                lukkModal={lukkModal}
                varselTekst='Når du avbryter avtalen, blir innholdet låst og den blir markert som "avbrutt" i din oversikt. Du kan ikke redigere eller gjenopprette den etterpå.'
                oversiktTekst="Avbryte avtale"
                bekreftelseTekst="avbryt avtale"
                avbrytelseTekst="behold avtale"
            />
        </>
    );
};
export default DesktopAvtaleSide;

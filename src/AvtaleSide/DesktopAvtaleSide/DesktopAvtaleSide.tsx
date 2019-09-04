import React, { useState } from 'react';
import { Context, Rolle } from '../../AvtaleContext';
import BekreftelseModal from '../../komponenter/modal/BekreftelseModal';
import BEMHelper from '../../utils/bem';
import AvbryteAvtalen from '../AvbryteAvtalen/AvbryteAvtalen';
import { Avtale } from '../avtale';
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
            <div className="avtaleside__desktop">
                {props.varsler}
                <div className={cls.element('lenkerlinje')}>
                    <TilbakeTilOversiktLenke />
                    <div className="avtaleside__avbrytOgDelLenk">
                        {' '}
                        {props.avtale.kanAvbrytes &&
                            !props.avtale.avbrutt &&
                            props.rolle === 'VEILEDER' && (
                                <AvbryteAvtalen
                                    avtale={props.avtale}
                                    avbrytOnclick={bekreftelseAvbrytAvtalen}
                                />
                            )}
                        {props.rolle === 'VEILEDER' && <DelLenkeTilAvtalen />}
                    </div>
                </div>
                <div className="avtaleside__container">
                    <Stegmeny
                        steg={props.avtaleSteg}
                        aktivtSteg={props.aktivtSteg}
                    />
                    <form className="avtaleside__innhold">
                        {props.aktivtSteg.komponent}

                        <NesteForrige
                            avtaleSteg={props.avtaleSteg}
                            aktivtSteg={props.aktivtSteg}
                        />
                    </form>
                </div>
            </div>
            <BekreftelseModal
                modalIsOpen={modalIsOpen}
                radTilSletting={props.avtale}
                slettOnClick={props.avbrytAvtale}
                lukkModal={lukkModal}
                navn="avtale"
                varselTekst={
                    'Når du avbryter avtalen, blir innholdet låst og den blir markert som "avbrutt" i din oversikt. Du kan ikke redigere eller gjenopprette den etterpå. '
                }
                oversiktTekst="Avbryte "
                bekreftelseTekst="AVBRYT "
                avbrytelseTekst="BEHOLD AVTALE "
            />
        </>
    );
};
export default DesktopAvtaleSide;

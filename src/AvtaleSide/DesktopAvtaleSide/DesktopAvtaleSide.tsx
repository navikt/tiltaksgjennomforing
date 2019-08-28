import React, { useState } from 'react';
import { Context, medContext, Rolle } from '../../AvtaleContext';
import BEMHelper from '../../utils/bem';
import { StegInfo } from '../AvtaleSide';
import DelLenkeTilAvtalen from '../DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import NesteForrige from '../NesteForrige/NesteForrige';
import Stegmeny from '../Stegmeny/Stegmeny';
import TilbakeTilOversiktLenke from '../TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import AvbryteAvtalen from '../AvbryteAvtalen/AvbryteAvtalen';
import { Avtale } from '../avtale';
import BekreftelseModal from '../../komponenter/modal/BekreftelseModal';

interface Props {
    avtaleSteg: StegInfo[];
    aktivtSteg: StegInfo;
    rolle: Rolle;
    avtale: Avtale;
}

const cls = BEMHelper('avtaleside');
const DesktopAvtaleSide: React.FunctionComponent<Props & Context> = props => {
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
                slettOnClick={props.avbryt}
                lukkModal={lukkModal}
                navn="avtale"
                varselTekst="Du er i ferd med å avbryte denne avtalen. Det vil si at all informasjon som er lagt inn ikke er gyldig lenger. Er du sikker på at du vil avbryte avtalen?"
                oversiktTekst="Avbryte "
                bekreftelseTekst="JA, AVBRYT "
                avbrytelseTekst="NEI, BEHOLD AVTALE"
            />
        </>
    );
};
export default medContext(DesktopAvtaleSide);

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
        // props.avtale.avbrutt = true;
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
                varselTekst="Du er i ferd med å avbryte/slette avtale. Hvis du gjør det vil alt innholdet i avtalen forsvinne. Er du sikker?"
            />
        </>
    );
};
export default medContext(DesktopAvtaleSide);

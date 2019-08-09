import React, { useState } from 'react';
import { Rolle } from '../../AvtaleContext';
import BEMHelper from '../../utils/bem';
import { StegInfo } from '../AvtaleSide';
import DelLenkeTilAvtalen from '../DelLenkeTilAvtalen/DelLenkeTilAvtalen';
import NesteForrige from '../NesteForrige/NesteForrige';
import Stegmeny from '../Stegmeny/Stegmeny';
import TilbakeTilOversiktLenke from '../TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import AvbryteAvtalen from '../AvbryteAvtalen/AvbryteAvtalen';
import { Avtale } from '../avtale';
import BekreftelseModal from '../../komponenter/modal/BekreftelseModal';
import RestService from '../../services/rest-service';

interface Props {
    avtaleSteg: StegInfo[];
    aktivtSteg: StegInfo;
    rolle: Rolle;
    avtale: Avtale;
}

const cls = BEMHelper('avtaleside');
const DesktopAvtaleSide: React.FunctionComponent<Props> = props => {
    const bekreftelseAvbrytAvtalen = () => {
        // props.avtale.avbruttStatus = true;
        setModalIsOpen(true);
    };
    // nå kalles avbryteAvtale men kan bli slettavtalen etter diskusjon
    // avhengig av om avtalen markeres som avbrutt eller slettes komplett med en gang (hensyn til personvern)
    const avbrytAvtale = async (avtale: Avtale) => {
        try {
            props.avtale.avbruttStatus = true;
            const nyAvtale = await RestService.lagreAvtale(props.avtale);
            props.avtale = nyAvtale;
            // await this.props.avtale.setAvtaleVerdi(avtale);
        } catch (error) {
            // this.props.visFeilmelding(error.message);}
        }
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
                        !props.avtale.avbruttStatus && (
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
                slettOnClick={avbrytAvtale}
                lukkModal={lukkModal}
                navn="avtale"
                varselTekst="Du er i ferd med å avbryte/slette eavtale. Hvis du gjør det vil alt innholdet i avtalen forsvinne. Er du sikker?"
            />
        </>
    );
};
export default DesktopAvtaleSide;

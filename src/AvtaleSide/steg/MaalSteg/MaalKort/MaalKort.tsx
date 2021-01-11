import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import { Maal } from '@/types/avtale';
import * as React from 'react';
import RedigerMaal from '../RedigerMaal/RedigerMaal';
import LagretMaal from './LagretMaal/LagretMaal';
import './MaalKort.less';
import { FunctionComponent, useContext, useState } from 'react';
import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { finnLedigeMaalkategorier } from '@/AvtaleSide/steg/MaalSteg/maal-utils';

interface Props {
    maal: Maal;
}

const MaalKort: FunctionComponent<Props> = props => {
    const context = useContext(AvtaleContext);
    const [redigereMaalkort, setRedigereMaalkort] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const endreMaal = () => {
        context.utforHandlingHvisRedigerbar(() => {
            setRedigereMaalkort(true);
        });
    };

    const avsluttRedigering = () => {
        setRedigereMaalkort(false);
    };

    const slettMaal = async () => {
        await context.slettMaal(props.maal);
        setOpenModal(false);
    };

    const verifiserSlettMaal = async () => {
        context.utforHandlingHvisRedigerbar(() => {
            slettMaal();
        });
    };

    return (
        <Innholdsboks className="maalkort">
            {redigereMaalkort ? (
                <RedigerMaal
                    defaultMaal={props.maal}
                    ledigeMaalkategorier={finnLedigeMaalkategorier(context.avtale.maal)}
                    avsluttRedigering={avsluttRedigering}
                />
            ) : (
                <LagretMaal maal={props.maal} endreOnClick={endreMaal} slettOnClick={() => setOpenModal(true)} />
            )}
            <BekreftelseModal
                modalIsOpen={openModal}
                bekreftOnClick={verifiserSlettMaal}
                lukkModal={() => setOpenModal(false)}
                varselTekst="Du er i ferd med å slette et mål. Hvis du gjør det vil alt innholdet i målet forsvinne. Er du sikker?"
                oversiktTekst="Slette mål"
                bekreftelseTekst="Ja, slett mål"
                avbrytelseTekst="avbryt"
            />
        </Innholdsboks>
    );
};

export default MaalKort;

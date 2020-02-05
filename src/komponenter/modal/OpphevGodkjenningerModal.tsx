import React, { FunctionComponent } from 'react';
import BekreftelseModal from './BekreftelseModal';

type Props = {
    modalIsOpen: boolean;
    bekreftOpphevGodkjenninger: () => Promise<any>;
    lukkModal: () => void;
};

const opphevGodkjenningerTekst = (
    <>
        En eller flere parter i avtalen har godkjent. Du er nå i ferd med å endre innholdet de har godkjent, og deres
        godkjenninger vil bli opphevet. De må da logge seg inn og godkjenne på nytt.
        <p>Er du sikker på at du vil fortsette?</p>
    </>
);

const OpphevGodkjenningerModal: FunctionComponent<Props> = props => {
    return (
        <BekreftelseModal
            modalIsOpen={props.modalIsOpen}
            bekreftOnClick={props.bekreftOpphevGodkjenninger}
            lukkModal={props.lukkModal}
            varselTekst={opphevGodkjenningerTekst}
            oversiktTekst="Endring av godkjent innhold"
            bekreftelseTekst="Ja, opphev godkjenninger"
            avbrytelseTekst="avbryt"
        />
    );
};

export default OpphevGodkjenningerModal;

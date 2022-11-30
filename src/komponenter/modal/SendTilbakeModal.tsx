import { AvtaleContext } from '@/AvtaleProvider';
import React, { FunctionComponent, useContext } from 'react';
import BekreftelseModal from './BekreftelseModal';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const SendTilbakeModal: FunctionComponent<Props> = (props) => {
    const { sendTilbakeTilBeslutter } = useContext(AvtaleContext);

    return (
        <BekreftelseModal
            bekreftOnClick={sendTilbakeTilBeslutter}
            lukkModal={props.lukkModal}
            modalIsOpen={props.isOpen}
            oversiktTekst="Send tilbake til beslutter uendret"
            modalInnhold={<></>}
            bekreftelseTekst="Send tilbake"
            avbrytelseTekst="Avbryt"
        />
    );
};

export default SendTilbakeModal;

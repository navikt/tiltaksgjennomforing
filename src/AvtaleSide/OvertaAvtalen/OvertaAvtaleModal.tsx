import React, { useContext } from 'react';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { AvtaleContext } from '@/AvtaleContext';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const OvertaAvtaleModal = (props: Props) => {
    const context = useContext(AvtaleContext);
    const bekreftValgtHandling = (): any => {
        props.lukkModal();
        context.overtaAvtale();
    };

    return (
        <>
            <BekreftelseModal
                modalIsOpen={props.isOpen}
                bekreftOnClick={() => bekreftValgtHandling()}
                lukkModal={() => props.lukkModal()}
                varselTekst="Du må huske å oppdatere kontaktinformasjonen til veileder i avtalen."
                oversiktTekst="Overta avtale"
                bekreftelseTekst="Overta avtalen"
                avbrytelseTekst="Lukk"
            />
        </>
    );
};

export default OvertaAvtaleModal;

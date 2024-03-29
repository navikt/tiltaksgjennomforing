import { AvtaleContext } from '@/AvtaleProvider';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import React, { useContext } from 'react';
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
        <BekreftelseModal
            modalIsOpen={props.isOpen}
            bekreftOnClick={() => bekreftValgtHandling()}
            lukkModal={() => props.lukkModal()}
            oversiktTekst="Overta avtale"
            bekreftelseTekst="Overta avtalen"
            avbrytelseTekst="Lukk"
        >
            Du må huske å oppdatere kontaktinformasjonen til veileder i avtalen.
        </BekreftelseModal>
    );
};

export default OvertaAvtaleModal;

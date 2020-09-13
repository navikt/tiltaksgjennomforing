import React, { useContext } from 'react';
import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import { AvtaleContext } from '@/AvtaleContext';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
}

const GjenopprettModal = (props: Props) => {
    const context = useContext(AvtaleContext);
    const bekreftValgtHandling = (): any => {
        props.lukkModal();
        context.gjenopprettAvtale();
    };

    return (
        <>
            <BekreftelseModal
                modalIsOpen={props.isOpen}
                bekreftOnClick={() => bekreftValgtHandling()}
                lukkModal={() => props.lukkModal()}
                varselTekst="Vil du gjenopprette avtalen? Hvis du gjenoppretter avtalen vil avtalen bli låst opp og satt til aktiv igjen."
                oversiktTekst="Gjenopprett avtale"
                bekreftelseTekst="Gjenopprett avtale"
                avbrytelseTekst="Angre valg"
            />
        </>
    );
};

export default GjenopprettModal;

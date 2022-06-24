import BekreftelseModal from '@/komponenter/modal/BekreftelseModal';
import React, { FunctionComponent, useState } from 'react';

const EndreInkluderingsutgifter: FunctionComponent = () => {
    const [modalApen, setModalApen] = useState(false);

    const lukkModal = () => {
        setModalApen(false);
    }
    const endreUtgifter = async () => {
        // await lalal
        setModalApen(false);
    }

    const endreUtgifterInnhold = (
        <div>
            lalala
        </div>
    )

    return (
        <div>
            <BekreftelseModal
                // style={{ minWidth: '35rem' }}
                avbrytelseTekst="Avbryt"
                bekreftelseTekst="Endre"
                oversiktTekst="Endre utgifter"
                modalIsOpen={modalApen}
                bekreftOnClick={endreUtgifter}
                lukkModal={lukkModal}
                varselTekst={endreUtgifterInnhold}
            />
        </div>
    );
};

export default EndreInkluderingsutgifter;

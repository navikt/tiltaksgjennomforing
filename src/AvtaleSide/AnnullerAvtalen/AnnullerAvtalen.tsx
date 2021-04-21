import { ReactComponent as AvbruttIkon } from '@/assets/ikoner/Avbryte-avtale.svg';
import AnnullerAvtaleModal from '@/komponenter/modal/AnnullerAvtaleModal';
import Lenke from 'nav-frontend-lenker';
import React, { useState } from 'react';
import './AnnullerAvtalen.less';

const AnnullerAvtalen = () => {
    const [annullerModalIsOpen, setAnnullerModalIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className="annullereavtalen">
                <Lenke
                    onClick={() => setAnnullerModalIsOpen(true)}
                    href="#"
                    className="annulleravtalen__lenke"
                    aria-label="Annuller avtale"
                    role="menuitem"
                >
                    <div aria-hidden={true}>
                        <AvbruttIkon className="annulleravtalen__ikon" />
                    </div>
                    Annuller avtalen
                </Lenke>
            </div>
            {annullerModalIsOpen && (
                <div aria-hidden={!annullerModalIsOpen}>
                    <AnnullerAvtaleModal isOpen={annullerModalIsOpen} lukkModal={() => setAnnullerModalIsOpen(false)} />
                </div>
            )}
        </>
    );
};

export default AnnullerAvtalen;

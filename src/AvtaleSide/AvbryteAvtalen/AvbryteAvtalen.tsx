import { ReactComponent as AvbruttIkon } from '@/assets/ikoner/Avbryte-avtale.svg';
import AvbrytAvtaleModal from '@/komponenter/modal/AvbrytAvtaleModal';
import Lenke from 'nav-frontend-lenker';
import React, { useState } from 'react';
import './AvbryteAvtalen.less';

const AvbryteAvtalen = () => {
    const [avbrytModalIsOpen, setAvbrytModalIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className="avbryteavtalen">
                <Lenke
                    onClick={() => setAvbrytModalIsOpen(true)}
                    href="#"
                    className="avbryteavtalen__lenke"
                    aria-label="Avbryt avtale"
                    role="menuitem"
                >
                    <div aria-hidden={true}>
                        <AvbruttIkon className="avbryteavtalen__ikon" />
                    </div>
                    Avbryt avtalen
                </Lenke>
            </div>
            {avbrytModalIsOpen && (
                <div aria-hidden={!avbrytModalIsOpen}>
                    <AvbrytAvtaleModal isOpen={avbrytModalIsOpen} lukkModal={() => setAvbrytModalIsOpen(false)} />
                </div>
            )}
        </>
    );
};

export default AvbryteAvtalen;

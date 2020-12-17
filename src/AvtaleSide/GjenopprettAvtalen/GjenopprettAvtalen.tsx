import React, { useState } from 'react';
import { ReactComponent as Synchronize } from '@/assets/ikoner/synchronize-4.svg';
import Lenke from 'nav-frontend-lenker';
import GjenopprettModal from '@/AvtaleSide/GjenopprettAvtalen/GjenopprettModal';

interface Props {
    erVeileder: boolean;
    kanGjenopprettes: boolean;
}

const GjenopprettAvtalen: React.FunctionComponent<Props> = (props: Props) => {
    const [apneGjenopprett, setApneGjenopprett] = useState<boolean>(false);
    return props.erVeileder && props.kanGjenopprettes ? (
        <>
            <div className="avbryteavtalen">
                <Lenke
                    onClick={() => setApneGjenopprett(true)}
                    href="#"
                    className="avbryteavtalen__lenke"
                    role="menuitem"
                >
                    <Synchronize className="avbryteavtalen__ikon" />
                    Gjenopprett avtale
                </Lenke>
            </div>
            <GjenopprettModal isOpen={apneGjenopprett} lukkModal={() => setApneGjenopprett(false)} />
        </>
    ) : null;
};

export default GjenopprettAvtalen;

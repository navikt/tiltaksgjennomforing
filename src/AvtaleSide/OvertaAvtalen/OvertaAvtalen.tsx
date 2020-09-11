import React from 'react';
import { ReactComponent as Synchronize } from '@/assets/ikoner/synchronize-4.svg';
import Lenke from 'nav-frontend-lenker';

interface Props {
    apneModal: () => void;
}

const OvertaAvtalen = (props: Props) => (
    <div className="overtaavtalen">
        <Lenke
            onClick={() => {
                props.apneModal();
            }}
            href="#"
            className="overtaavtalen__lenke"
        >
            <Synchronize className="overtaavtalen__ikon" />
            Overta avtale
        </Lenke>
    </div>
);

export default OvertaAvtalen;

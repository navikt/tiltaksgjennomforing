import React from 'react';
import { ReactComponent as Synchronize } from '@/assets/ikoner/synchronize-4.svg';
import Lenke from 'nav-frontend-lenker';

interface Props {
    apneModal: () => void;
}

const GjenopprettAvtalen = (props: Props) => (
    <div className="avbryteavtalen">
        <Lenke onClick={() => props.apneModal()} href="#" className="avbryteavtalen__lenke">
            <Synchronize className="avbryteavtalen__ikon" />
            Gjenopprett avtale
        </Lenke>
    </div>
);

export default GjenopprettAvtalen;

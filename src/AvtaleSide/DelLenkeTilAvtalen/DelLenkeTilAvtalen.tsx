import Lenke from 'nav-frontend-lenker';
import React, { FunctionComponent, useState } from 'react';
import { ReactComponent as ShareIkon } from '@/assets/ikoner/share.svg';
import KopierLenkeModal from '@/komponenter/modal/KopierLenkeModal';
import './DelLenkeTilAvtalen.less';

const DelLenkeTilAvtalen: FunctionComponent = () => {
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <>
            <Lenke onClick={() => setOpen(true)} href="#">
                <ShareIkon className="lenkedeling__ikon" />
                Del lenke til avtalen
            </Lenke>
            <KopierLenkeModal isOpen={isOpen} lukkModal={() => setOpen(false)} />
        </>
    );
};

export default DelLenkeTilAvtalen;

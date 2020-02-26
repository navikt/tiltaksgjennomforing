import { ReactComponent as ShareIkon } from '@/assets/ikoner/del-lenke.svg';
import SendVarselModal from '@/AvtaleSide/DelLenkeTilAvtalen/SendVarselModal';
import Lenke from 'nav-frontend-lenker';
import React, { FunctionComponent, useState } from 'react';
import './DelLenkeTilAvtalen.less';

const DelLenkeTilAvtalen: FunctionComponent = () => {
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <>
            <Lenke onClick={() => setOpen(true)} href="#">
                <ShareIkon className="lenkedeling__ikon" />
                Del lenke til avtalen
            </Lenke>
            <SendVarselModal isOpen={isOpen} lukkModal={() => setOpen(false)} />
        </>
    );
};

export default DelLenkeTilAvtalen;

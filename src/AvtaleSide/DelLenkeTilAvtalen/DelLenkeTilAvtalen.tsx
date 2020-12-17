import { ReactComponent as ShareIkon } from '@/assets/ikoner/del-lenke.svg';
import SendVarselModal from '@/AvtaleSide/DelLenkeTilAvtalen/SendVarselModal';
import Lenke from 'nav-frontend-lenker';
import React, { FunctionComponent, useState } from 'react';
import './DelLenkeTilAvtalen.less';
import BEMHelper from '@/utils/bem';

const DelLenkeTilAvtalen: FunctionComponent = () => {
    const cls = BEMHelper('lenkedeling');
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <>
            <Lenke onClick={() => setOpen(true)} href="#" role="menuitem" className={cls.element('lenke')}>
                <div aria-hidden={true}>
                    <ShareIkon className={cls.element('ikon')} />
                </div>
                Del lenke til avtalen
            </Lenke>
            <div aria-hidden={!isOpen}>
                <SendVarselModal isOpen={isOpen} lukkModal={() => setOpen(false)} />
            </div>
        </>
    );
};

export default DelLenkeTilAvtalen;

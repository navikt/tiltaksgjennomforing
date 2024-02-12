import ShareIkon from '@/assets/ikoner/del-lenke.svg?react';
import SendVarselModal from '@/AvtaleSide/DelLenkeTilAvtalen/SendVarselModal';
import { Link } from '@navikt/ds-react';
import React, { FunctionComponent, useState } from 'react';
import './DelLenkeTilAvtalen.less';
import BEMHelper from '@/utils/bem';

const DelLenkeTilAvtalen: FunctionComponent = () => {
    const cls = BEMHelper('lenkedeling');
    const [isOpen, setOpen] = useState<boolean>(false);

    return (
        <>
            <Link onClick={() => setOpen(true)} href="#" role="menuitem" className={cls.element('link')}>
                <div aria-hidden={true}>
                    <ShareIkon className={cls.element('ikon')} />
                </div>
                Del lenke til avtalen
            </Link>
            <div aria-hidden={!isOpen}>
                <SendVarselModal isOpen={isOpen} lukkModal={() => setOpen(false)} />
            </div>
        </>
    );
};

export default DelLenkeTilAvtalen;

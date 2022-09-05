import React, { FunctionComponent } from 'react';
import { useCookies } from 'react-cookie';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import { Knapp } from 'nav-frontend-knapper';
import BEMHelper from '@/utils/bem';
import './byttTilBeslutter.less';

const ByttTilBeslutter: FunctionComponent = () => {
    const [, setCookie] = useCookies([INNLOGGET_PART]);
    const cls = BEMHelper('byttTilBeslutter');

    const onClick = () => {
        setCookie(INNLOGGET_PART, 'BESLUTTER', { path: '/tiltaksgjennomforing' });
        window.location.href = '/tiltaksgjennomforing';
    };
    return (
        <div className={cls.className}>
            <div className={cls.element('container')}>
                <Knapp mini onClick={onClick}>
                    Bytt til visning for beslutter
                </Knapp>
            </div>
        </div>
    );
};

export default ByttTilBeslutter;

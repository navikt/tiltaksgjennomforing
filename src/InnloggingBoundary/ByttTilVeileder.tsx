import React, { FunctionComponent } from 'react';
import { useCookies } from 'react-cookie';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import { Knapp } from 'nav-frontend-knapper';
import './byttTilBeslutter/byttTilBeslutter.less';
import BEMHelper from '@/utils/bem';

const ByttTilVeileder: FunctionComponent = () => {
    const [, setCookie] = useCookies([INNLOGGET_PART]);
    const cls = BEMHelper('byttTilBeslutter');

    const onClick = () => {
        setCookie(INNLOGGET_PART, 'VEILEDER', { path: '/tiltaksgjennomforing' });
        window.location.href = '/tiltaksgjennomforing';
    };
    return (
        <div className={cls.className}>
            <div className={cls.element('container')}>
                <Knapp mini onClick={onClick}>
                    Bytt til visning for veileder
                </Knapp>
            </div>
        </div>
    );
};

export default ByttTilVeileder;

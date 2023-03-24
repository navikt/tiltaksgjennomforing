import React, { FunctionComponent } from 'react';
import { useCookies } from 'react-cookie';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import { Button } from '@navikt/ds-react';
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
                <Button size='small' variant="secondary" onClick={onClick}>
                    Bytt til visning for beslutter
                </Button>
            </div>
        </div>
    );
};

export default ByttTilBeslutter;

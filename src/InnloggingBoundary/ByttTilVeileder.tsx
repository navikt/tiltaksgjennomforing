import { FunctionComponent } from 'react';
import { useCookies } from 'react-cookie';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import { Button } from '@navikt/ds-react';
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
                <Button size="small" variant="secondary" onClick={onClick}>
                    Bytt til visning for veileder
                </Button>
            </div>
        </div>
    );
};

export default ByttTilVeileder;

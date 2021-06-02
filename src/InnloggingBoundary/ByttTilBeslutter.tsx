import React, { FunctionComponent } from 'react';
import { useCookies } from 'react-cookie';
import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import { Knapp } from 'nav-frontend-knapper';

const ByttTilVeileder: FunctionComponent = () => {
    const [, setCookie] = useCookies([INNLOGGET_PART]);

    const onClick = () => {
        setCookie(INNLOGGET_PART, 'BESLUTTER', { path: '/tiltaksgjennomforing' });
        window.location.pathname = '/tiltaksgjennomforing';
    };
    return (
        <div
            style={{
                width: '100%',
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'center',
                padding: '0.5rem',
            }}
        >
            <Knapp mini onClick={onClick}>
                Bytt til visning for beslutter
            </Knapp>
        </div>
    );
};

export default ByttTilVeileder;

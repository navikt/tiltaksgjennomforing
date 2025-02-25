import React, { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SIDE_FOER_INNLOGGING = 'side-foer-innlogging';
export const INNLOGGET_PART = 'innlogget-part';

type RedirectEtterLoginProps = { children?: React.ReactNode };

const RedirectEtterLogin: FunctionComponent<RedirectEtterLoginProps> = (props) => {
    const navigation = useNavigate();
    const redirectTilSideFoerInnlogging = () => {
        const sideFoerInnlogging = sessionStorage.getItem(SIDE_FOER_INNLOGGING);
        if (typeof sideFoerInnlogging === 'string') {
            sessionStorage.removeItem(SIDE_FOER_INNLOGGING);
            navigation(sideFoerInnlogging);
        }
    };
    //eslint-disable-next-line
    useEffect(redirectTilSideFoerInnlogging, []);
    return <>{props.children}</>;
};

export default RedirectEtterLogin;

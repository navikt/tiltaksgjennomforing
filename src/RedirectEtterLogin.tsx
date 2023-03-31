import amplitude from 'amplitude-js';
import { FunctionComponent, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router';

export const SIDE_FOER_INNLOGGING = 'side-foer-innlogging';
export const INNLOGGET_PART = 'innlogget-part';

const RedirectEtterLogin: FunctionComponent<PropsWithChildren> = (props) => {
    const navigate = useNavigate();
    
    const redirectTilSideFoerInnlogging = () => {
        const sideFoerInnlogging = sessionStorage.getItem(SIDE_FOER_INNLOGGING);
        if (typeof sideFoerInnlogging === 'string') {
            sessionStorage.removeItem(SIDE_FOER_INNLOGGING);
            amplitude.logEvent('#tiltak-bruker-ble-innlogget');
            navigate(sideFoerInnlogging);
        }
    };
    //eslint-disable-next-line
    useEffect(redirectTilSideFoerInnlogging, []);
    return <>{props.children}</>;
};

export default RedirectEtterLogin;

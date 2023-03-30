import amplitude from 'amplitude-js';
import React, { FunctionComponent, useEffect } from 'react';
import { useNavigate, useParams, useLocation,  } from 'react-router-dom';

export const SIDE_FOER_INNLOGGING = 'side-foer-innlogging';
export const INNLOGGET_PART = 'innlogget-part';

type RedirectEtterLoginProps = { children?: React.ReactNode };
/*
function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    }

    return ComponentWithRouterProp;
}
*/
const RedirectEtterLogin: FunctionComponent<RedirectEtterLoginProps> = (props) => {
    const redirectTilSideFoerInnlogging = () => {
        const sideFoerInnlogging = sessionStorage.getItem(SIDE_FOER_INNLOGGING);
        let navigate = useNavigate();
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

export default (RedirectEtterLogin);

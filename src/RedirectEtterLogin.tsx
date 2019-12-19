import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import amplitude from 'amplitude-js';

export const SIDE_FOER_INNLOGGING = 'side-foer-innlogging';
export const INNLOGGET_PART = 'innlogget-part';

const RedirectEtterLogin: FunctionComponent<RouteComponentProps> = props => {
    const redirectTilSideFoerInnlogging = () => {
        const sideFoerInnlogging = sessionStorage.getItem(SIDE_FOER_INNLOGGING);
        if (typeof sideFoerInnlogging === 'string') {
            sessionStorage.removeItem(SIDE_FOER_INNLOGGING);
            amplitude.logEvent('bruker-ble-innlogget');
            props.history.push(sideFoerInnlogging);
        }
    };
    useEffect(redirectTilSideFoerInnlogging, []);
    return <>{props.children}</>;
};

export default withRouter(RedirectEtterLogin);

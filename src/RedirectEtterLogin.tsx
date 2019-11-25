import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import amplitude from 'amplitude-js';

export const SIDE_FOER_INNLOGGING = 'side-foer-innlogging';
export const INNLOGGET_PART = 'innlogget-part';

const RedirectEtterLogin: FunctionComponent<RouteComponentProps> = props => {
    const redirectTilSideFoerInnlogging = () => {
        const sideFoerInnlogging = sessionStorage.getItem(SIDE_FOER_INNLOGGING);
        const innloggingsPart = sessionStorage.getItem(INNLOGGET_PART);
        if (typeof sideFoerInnlogging === 'string') {
            sessionStorage.removeItem(SIDE_FOER_INNLOGGING);
            amplitude.logEvent('bruker-ble-innlogget');

            // if (sideFoerInnlogging === '' || sideFoerInnlogging === '/tiltaksgjennomforing') {
            //     // Kommer ikke fra en spesifikk side
            //     // props.history.push(innloggingsPart!);
            // } else {
            //     // Kommer fra en spesifikk side, eks en avtale
            // props.history.push(sideFoerInnlogging);
            // }
            props.history.push(sideFoerInnlogging);
        }
    };
    useEffect(redirectTilSideFoerInnlogging, []);
    return <>{props.children}</>;
};

export default withRouter(RedirectEtterLogin);

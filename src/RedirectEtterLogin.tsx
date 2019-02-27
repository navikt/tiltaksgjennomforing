import React, { FunctionComponent, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

export const SIDE_FOER_INNLOGGING = 'side-foer-innlogging';

const RedirectEtterLogin: FunctionComponent<RouteComponentProps> = props => {
    const redirectTilSideFoerInnlogging = () => {
        const sideFoerInnlogging = sessionStorage.getItem(SIDE_FOER_INNLOGGING);
        if (sideFoerInnlogging) {
            sessionStorage.removeItem(SIDE_FOER_INNLOGGING);
            props.history.replace(sideFoerInnlogging);
        }
    };

    useEffect(redirectTilSideFoerInnlogging, []);

    return <>{props.children}</>;
};

export default withRouter(RedirectEtterLogin);

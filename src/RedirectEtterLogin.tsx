import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

export const SIDE_FOER_INNLOGGING = 'side-foer-innlogging';

class RedirectEtterLogin extends Component<RouteComponentProps> {
    componentDidMount() {
        this.redirectTilSideFoerInnlogging();
    }

    redirectTilSideFoerInnlogging = () => {
        const sideFoerInnlogging = sessionStorage.getItem(SIDE_FOER_INNLOGGING);
        if (sideFoerInnlogging) {
            sessionStorage.removeItem(SIDE_FOER_INNLOGGING);
            this.props.history.push(sideFoerInnlogging);
        }
    };

    render() {
        return this.props.children;
    }
}

export default withRouter(RedirectEtterLogin);

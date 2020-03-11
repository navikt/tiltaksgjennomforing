import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import amplitude from '@/utils/amplitude';
import { Knapp, KnappBaseProps } from 'nav-frontend-knapper';
import React from 'react';
import { useCookies } from 'react-cookie';

const LoggUtKnapp: React.FunctionComponent<KnappBaseProps> = props => {
    const [, , removeCookie] = useCookies();

    const onClick = () => {
        removeCookie(INNLOGGET_PART);
        amplitude.logEvent('#tiltak-bruker-logget-ut', {}, () => {
            window.location.href = '/tiltaksgjennomforing/logout';
        });
    };
    return (
        <Knapp mini={true} onClick={onClick} {...props}>
            Logg ut
        </Knapp>
    );
};

export default LoggUtKnapp;

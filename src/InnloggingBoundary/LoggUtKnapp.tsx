import React from 'react';
import amplitude from '@/utils/amplitude';
import { Knapp, KnappBaseProps } from 'nav-frontend-knapper';

const LoggUtKnapp: React.FunctionComponent<KnappBaseProps> = props => {
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        amplitude.logEvent('bruker-logget-ut', {}, () => {
            window.location.href = '/tiltaksgjennomforing/logout';
        });
    };
    return (
        <Knapp
            className="innloggingslinje__loggutknapp"
            mini={true}
            onClick={onClick}
            {...props}
        >Logg ut</Knapp>
    );
};

export default LoggUtKnapp;

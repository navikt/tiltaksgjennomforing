import { INNLOGGET_PART } from '@/RedirectEtterLogin';
import amplitude from '@/utils/amplitude';
import { Button, ButtonProps } from '@navikt/ds-react';
import React from 'react';
import { useCookies } from 'react-cookie';

const LoggUtKnapp: React.FunctionComponent<ButtonProps> = (props) => {
    const [, , removeCookie] = useCookies();

    const onClick = () => {
        removeCookie(INNLOGGET_PART);
        amplitude.logEvent('#tiltak-bruker-logget-ut', {}, () => {
            window.location.href = '/tiltaksgjennomforing/logout';
        });
    };
    return (
        <Button size="small" variant="secondary" onClick={onClick} {...props}>
            Logg ut
        </Button>
    );
};

export default LoggUtKnapp;

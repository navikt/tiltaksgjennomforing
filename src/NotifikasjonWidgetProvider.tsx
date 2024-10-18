import { FunctionComponent, PropsWithChildren, useContext } from 'react';

import * as NotifikasjonWidget from '@navikt/arbeidsgiver-notifikasjon-widget';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { basename } from '@/Router';

const miljo = (() => {
    switch (window.location.hostname) {
        case 'arbeidsgiver.nav.no':
            return 'prod';
        case 'arbeidsgiver-q.nav.no':
        case 'tiltaksgjennomforing.dev.nav.no':
        case 'tiltaksgjennomforing.dev.ekstern.nav.no':
            return 'dev';
        case 'arbeidsgiver.labs.nais.io':
            return 'labs';
        default:
            return 'local';
    }
})();

export const NotifikasjonWidgetProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    if (innloggetBruker.rolle === 'ARBEIDSGIVER') {
        return (
            <NotifikasjonWidget.NotifikasjonWidgetProvider apiUrl={`${basename}/notifikasjon-bruker-api`} miljo={miljo}>
                <>{children}</>
            </NotifikasjonWidget.NotifikasjonWidgetProvider>
        );
    } else {
        return <>{children}</>;
    }
};

import { useRouteError } from 'react-router-dom';

import { IkkeTilgangError } from '@/types/errors';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';

import IkkeTilgang403 from './IkkeTilgang403';

function OversiktRouteError() {
    const error = useRouteError();
    const { rolle } = useInnloggetBruker();

    console.log('error', error);

    if (error instanceof IkkeTilgangError) {
        console.log('Error av type IkkeTilgangError', error);
        return <IkkeTilgang403 rolle={rolle} feilkode={error} />;
    }

    throw error;
}

export default OversiktRouteError;

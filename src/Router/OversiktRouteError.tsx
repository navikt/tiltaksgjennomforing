import { useRouteError } from 'react-router-dom';

import { IkkeTilgangError } from '@/types/errors';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';

import IkkeTilgang403 from './IkkeTilgang403';

function OversiktRouteError() {
    const error = useRouteError();
    const { rolle } = useInnloggetBruker();

    if (error instanceof IkkeTilgangError) {
        return <IkkeTilgang403 rolle={rolle} />;
    }

    throw error;
}

export default OversiktRouteError;

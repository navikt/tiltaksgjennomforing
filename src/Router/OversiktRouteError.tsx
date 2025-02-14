import { useRouteError } from 'react-router-dom';

import { IkkeTilgangError } from '@/types/errors';
import IkkeTilgang403 from '@/Router/IkkeTilgang403';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';

function OversiktRouteError() {
    const error = useRouteError();
    const { rolle } = useInnloggetBruker();

    if (error instanceof IkkeTilgangError) {
        return <IkkeTilgang403 rolle={rolle} />;
    }

    throw error;
}

export default OversiktRouteError;

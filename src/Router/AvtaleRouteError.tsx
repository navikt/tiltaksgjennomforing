import { useRouteError } from 'react-router-dom';

import { IkkeFunnetError } from '@/types/errors';
import IkkeFunnet404 from '@/Router/IkkeFunnet404';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';

function AvtaleRouteError() {
    const error = useRouteError();
    const { rolle } = useInnloggetBruker();

    if (error instanceof IkkeFunnetError) {
        return <IkkeFunnet404 rolle={rolle} />;
    }

    throw error;
}

export default AvtaleRouteError;

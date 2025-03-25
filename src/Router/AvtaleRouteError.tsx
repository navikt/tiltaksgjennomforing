import { useRouteError } from 'react-router-dom';

import { IkkeFunnetError } from '@/types/errors';
import { useInnloggetBruker } from '@/InnloggingBoundary/InnloggingBoundary';

import IkkeFunnet404 from './IkkeFunnet404';

function AvtaleRouteError() {
    const error = useRouteError();
    const { rolle } = useInnloggetBruker();

    if (error instanceof IkkeFunnetError) {
        return <IkkeFunnet404 rolle={rolle} />;
    }

    throw error;
}

export default AvtaleRouteError;

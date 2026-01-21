import AvtaleOversikt from '@/AvtaleOversikt/AvtaleOversikt';
import { FiltreringProvider } from '@/AvtaleOversikt/Filtrering/FiltreringProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { FunctionComponent, useContext } from 'react';
import { FiltreringProviderGammel } from './AvtaleOversikt/Filtrering/GammelFiltrering/FiltreringProviderGammel';
import BeslutterOversikt from './BeslutterOversikt/BeslutterOversikt';

const Oversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);

    if (innloggetBruker.rolle === 'BESLUTTER') {
        return (
            <FiltreringProviderGammel>
                <BeslutterOversikt />
            </FiltreringProviderGammel>
        );
    } else {
        return (
            <FiltreringProvider>
                <AvtaleOversikt />
            </FiltreringProvider>
        );
    }
};

export default Oversikt;

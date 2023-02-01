import AvtaleOversikt from '@/AvtaleOversikt/AvtaleOversikt';
import { FiltreringProvider } from '@/AvtaleOversikt/Filtrering/FiltreringProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { FunctionComponent, useContext } from 'react';
import BeslutterOversikt from './BeslutterOversikt/BeslutterOversikt';

const Oversikt: FunctionComponent = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    return (
        <FiltreringProvider>
            {innloggetBruker.rolle === 'BESLUTTER' ? <BeslutterOversikt /> : <AvtaleOversikt />}
            {/* {innloggetBruker.rolle === 'BESLUTTER' ? <Alert variant='info'>Vi jobber med å rette noen feil i besluttervisningen.</Alert> : <AvtaleOversikt />} */}
        </FiltreringProvider>
    );
};

export default Oversikt;

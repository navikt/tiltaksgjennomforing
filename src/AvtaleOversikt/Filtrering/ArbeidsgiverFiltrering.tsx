import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import React, { FunctionComponent } from 'react';
import { FiltreringProps } from './VeilederFiltrering';

const ArbeidsgiverFiltrering: FunctionComponent<FiltreringProps> = props => {
    // const innloggetBruker = useContext(InnloggetBrukerContext);
    // const orgMedRettigheter = innloggetBruker.organisasjoner.find(o => o.bedriftNr === props.valgtBedrift)!;

    return <TiltakstypeFilter {...props} />;
};

export default ArbeidsgiverFiltrering;

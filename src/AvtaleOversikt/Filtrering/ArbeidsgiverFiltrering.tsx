import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import { useFilter } from '@/AvtaleOversikt/Filtrering/useFilter';
import React, { FunctionComponent } from 'react';

const ArbeidsgiverFiltrering: FunctionComponent = () => {
    const { endreFilter, filtre } = useFilter();
    return <TiltakstypeFilter filtre={filtre} endreFilter={endreFilter} erBeslutter={false} />;
};

export default ArbeidsgiverFiltrering;

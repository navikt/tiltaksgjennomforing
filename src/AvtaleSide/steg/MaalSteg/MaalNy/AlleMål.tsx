import { AvtaleContext } from '@/AvtaleProvider';
import React, { FunctionComponent, useContext } from 'react';
import EtMaal from './EtMaal';

const AlleMål: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);

    return (
        <>
            {avtaleContext.avtale.maal.map(maal => (
                <EtMaal maal={maal} />
            ))}
        </>
    );
};

export default AlleMål;

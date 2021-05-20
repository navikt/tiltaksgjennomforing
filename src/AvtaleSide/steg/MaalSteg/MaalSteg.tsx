import { AvtaleContext } from '@/AvtaleProvider';
import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import MaalKort from './MaalKort/MaalKort';
import AlleMål from './MaalNy/AlleMål';
import OpprettMaal from './MaalNy/OpprettMaal';
import OppretteNyttMaal from './OpprettMaal/OppretteNyttMaal';

const MaalSteg: FunctionComponent = () => {
    const context = useContext(AvtaleContext);

    return (
        <div role="main">
            <OppretteNyttMaal />
            <OpprettMaal />
            {context.avtale.maal.map((maal, index) => (
                <MaalKort key={index} maal={maal} />
            ))}
            <AlleMål />
        </div>
    );
};

export default MaalSteg;

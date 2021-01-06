import { AvtaleContext } from '@/AvtaleProvider';
import * as React from 'react';
import MaalKort from './MaalKort/MaalKort';
import OppretteNyttMaal from './OpprettMaal/OppretteNyttMaal';
import { FunctionComponent, useContext } from 'react';

const MaalSteg: FunctionComponent = () => {
    const context = useContext(AvtaleContext);

    return (
        <div role="main">
            <OppretteNyttMaal />
            {context.avtale.maal.map((maal, index) => (
                <MaalKort key={index} maal={maal} />
            ))}
        </div>
    );
};

export default MaalSteg;

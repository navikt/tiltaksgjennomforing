import * as React from 'react';
import './KontaktinfoSteg.less';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import { medContext } from '../avtaleContext';

const KontaktinfoSteg = () => {
    return (
        <div className="kontaktinformasjon">
            <DeltakerinfoDel />
            {/*            <ArbeidsgiverinfoDel />
            <VeilederinfoDel />*/}
        </div>
    );
};

export default medContext(KontaktinfoSteg);

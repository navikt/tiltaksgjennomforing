import * as React from 'react';
import './KontaktinfoSteg.less';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';
import VeilederinfoDel from './VeilederinfoDel/VeilederinfoDel';

const KontaktinfoSteg = () => {
    return (
        <div className="kontaktinformasjon">
            <DeltakerinfoDel />
            <ArbeidsgiverinfoDel />
            <VeilederinfoDel />
        </div>
    );
};

export default KontaktinfoSteg;

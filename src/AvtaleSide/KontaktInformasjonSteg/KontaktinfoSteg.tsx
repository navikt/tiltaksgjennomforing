import * as React from 'react';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';
import VeilederinfoDel from './VeilederinfoDel/VeilederinfoDel';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';

const KontaktinfoSteg = () => {
    return (
        <Innholdsboks>
            <DeltakerinfoDel />
            <ArbeidsgiverinfoDel />
            <VeilederinfoDel />
        </Innholdsboks>
    );
};

export default KontaktinfoSteg;

import * as React from 'react';
import './KontaktinfoSteg.less';
import { EndreAvtale } from '../EndreAvtale';
import {
    Arbeidsgiverinfo,
    Bedriftinfo,
    Deltakerinfo,
    Veilederinfo,
} from '../Avtale';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';
import VeilederinfoDel from './VeilederinfoDel/VeilederinfoDel';

type Kontaktinformasjon = Deltakerinfo &
    Bedriftinfo &
    Arbeidsgiverinfo &
    Veilederinfo &
    EndreAvtale;

const KontaktinfoSteg = (props: Kontaktinformasjon) => {
    return (
        <div className="kontaktinformasjon">
            <DeltakerinfoDel {...props} />
            <ArbeidsgiverinfoDel {...props} />
            <VeilederinfoDel {...props} />
        </div>
    );
};

export default KontaktinfoSteg;

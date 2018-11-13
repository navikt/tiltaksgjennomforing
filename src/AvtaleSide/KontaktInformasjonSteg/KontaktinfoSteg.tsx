import * as React from 'react';
import './KontaktinfoSteg.less';
import { EndreAvtale } from '../EndreAvtale';
import { Arbeidsgiverinfo, Bedriftinfo, Deltakerinfo } from '../Avtale';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';

type Kontaktinformasjon = Deltakerinfo &
    Bedriftinfo &
    Arbeidsgiverinfo &
    EndreAvtale;

const KontaktinfoSteg = (props: Kontaktinformasjon) => {
    return (
        <div className="kontaktinformasjon">
            <DeltakerinfoDel {...props} />
            <ArbeidsgiverinfoDel {...props} />
        </div>
    );
};

export default KontaktinfoSteg;

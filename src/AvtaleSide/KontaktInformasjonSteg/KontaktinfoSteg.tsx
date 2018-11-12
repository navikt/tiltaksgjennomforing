import * as React from 'react';
import './KontaktinfoSteg.less';
import { EndreAvtale } from '../EndreAvtale';
import { Arbeidsgiverinfo, Deltakerinfo } from '../Avtale';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';

type Kontaktinformasjon = Deltakerinfo & Arbeidsgiverinfo & EndreAvtale;

const KontaktinfoSteg = (props: Kontaktinformasjon) => {
    return (
        <div className="kontaktinformasjon">
            <DeltakerinfoDel {...props} />
        </div>
    );
};

export default KontaktinfoSteg;

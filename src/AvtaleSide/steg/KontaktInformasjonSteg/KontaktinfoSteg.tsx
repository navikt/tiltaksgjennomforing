import { medContext } from '@/AvtaleContext';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import * as React from 'react';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import './KontaktinfoSteg.less';
import VeilederinfoDel from './VeilederinfoDel/VeilederinfoDel';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { Arbeidsgiverinfo, Bedriftinfo, Deltakerinfo, Veilederinfo } from '@/types/avtale';

const KontaktinfoSteg = (props: InputStegProps<Deltakerinfo & Bedriftinfo & Arbeidsgiverinfo & Veilederinfo>) => (
    <Innholdsboks>
        <DeltakerinfoDel {...props} />
        <ArbeidsgiverinfoDel {...props} />
        <VeilederinfoDel {...props} />
        <LagreKnapp
            className="kontaktinfo-steg__lagre-knapp"
            lagre={props.lagreAvtale}
            label={'Lagre'}
            suksessmelding={'Avtale lagret'}
        />
    </Innholdsboks>
);

export default medContext(KontaktinfoSteg);

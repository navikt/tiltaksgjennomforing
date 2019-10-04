import * as React from 'react';
import { Context, medContext } from '@/AvtaleContext';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import VeilederinfoDel from './VeilederinfoDel/VeilederinfoDel';
import './KontaktinfoSteg.less';

const KontaktinfoSteg = (props: Context) => (
    <Innholdsboks>
        <DeltakerinfoDel />
        <ArbeidsgiverinfoDel />
        <VeilederinfoDel />
        <LagreKnapp
            className="kontaktinfo-steg__lagre-knapp"
            lagre={props.lagreAvtale}
            label={'Lagre'}
            suksessmelding={'Avtale lagret'}
        />
    </Innholdsboks>
);

export default medContext(KontaktinfoSteg);

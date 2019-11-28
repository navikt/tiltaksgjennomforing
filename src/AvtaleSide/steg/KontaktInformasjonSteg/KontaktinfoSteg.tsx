import { medContext } from '@/AvtaleContext';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import * as React from 'react';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import VeilederinfoDel from './VeilederinfoDel/VeilederinfoDel';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import { Arbeidsgiverinfo, Bedriftinfo, Deltakerinfo, Veilederinfo } from '@/types/avtale';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const KontaktinfoSteg = (props: InputStegProps<Deltakerinfo & Bedriftinfo & Arbeidsgiverinfo & Veilederinfo>) => (
    <Innholdsboks>
        <DeltakerinfoDel {...props} />
        <VerticalSpacer thirtyTwoPx={true} />
        <ArbeidsgiverinfoDel {...props} />
        <VerticalSpacer thirtyTwoPx={true} />
        <VeilederinfoDel {...props} />
        <VerticalSpacer thirtyTwoPx={true} />
        <LagreKnapp
            className="kontaktinfo-steg__lagre-knapp"
            lagre={props.lagreAvtale}
            label={'Lagre'}
            suksessmelding={'Avtale lagret'}
        />
    </Innholdsboks>
);

export default medContext(KontaktinfoSteg);

import { medContext, Rolle } from '@/AvtaleContext';
import { InputStegProps } from '@/AvtaleSide/input-steg-props';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import {
    Arbeidsgiverinfo,
    AvtaleMetadata,
    Avtaleparter,
    Bedriftinfo,
    Deltakerinfo,
    RelasjonerInfo,
    Veilederinfo,
} from '@/types/avtale';
import * as React from 'react';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import VeilederinfoDel from './VeilederinfoDel/VeilederinfoDel';

const KontaktinfoSteg = (
    props: InputStegProps<
        Avtaleparter & Deltakerinfo & Bedriftinfo & Arbeidsgiverinfo & Veilederinfo & RelasjonerInfo & AvtaleMetadata
    > & {
        rolle: Rolle;
    }
) => (
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

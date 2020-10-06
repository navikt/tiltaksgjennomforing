import { AvtaleContext } from '@/AvtaleProvider';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import VeilederinfoDel from './VeilederinfoDel/VeilederinfoDel';

const KontaktinfoSteg: FunctionComponent = () => {
    const { lagreAvtale } = useContext(AvtaleContext);

    return (
        <Innholdsboks>
            <DeltakerinfoDel />
            <VerticalSpacer thirtyTwoPx={true} />
            <ArbeidsgiverinfoDel />
            <VerticalSpacer thirtyTwoPx={true} />
            <VeilederinfoDel />
            <VerticalSpacer thirtyTwoPx={true} />
            <LagreKnapp
                className="kontaktinfo-steg__lagre-knapp"
                lagre={lagreAvtale}
                label={'Lagre'}
                suksessmelding={'Avtale lagret'}
            />
        </Innholdsboks>
    );
};

export default KontaktinfoSteg;

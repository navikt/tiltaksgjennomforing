import * as React from 'react';
import { Context, medContext } from '../../AvtaleContext';
import Innholdsboks from '../../komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '../../komponenter/LagreKnapp/LagreKnapp';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import VeilederinfoDel from './VeilederinfoDel/VeilederinfoDel';

const KontaktinfoSteg = (props: Context) => {
    return (
        <>
            <Innholdsboks>
                <DeltakerinfoDel />
                <ArbeidsgiverinfoDel />
                <VeilederinfoDel />
            </Innholdsboks>
            <LagreKnapp
                lagre={props.lagreAvtale}
                label={'Lagre'}
                suksessmelding={'Avtale lagret'}
            />
        </>
    );
};

export default medContext(KontaktinfoSteg);

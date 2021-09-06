import { AvtaleContext } from '@/AvtaleProvider';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import React, { FunctionComponent, useContext } from 'react';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import './kontaktinfo.less';
import VeilederinfoDel from './VeilederinfoDel/VeilederinfoDel';
import KontorInfo from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/KontorInfo';

const KontaktinfoSteg: FunctionComponent = () => {
    const { lagreAvtale } = useContext(AvtaleContext);

    return (
        <Innholdsboks>
            <KontorInfo oppsummeringside={false} />
            <DeltakerinfoDel />
            <ArbeidsgiverinfoDel />
            <VeilederinfoDel />
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

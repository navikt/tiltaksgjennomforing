import { AvtaleContext } from '@/AvtaleProvider';
import DeltakerInfo from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/DeltakerInfo';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import React, { FunctionComponent, useContext } from 'react';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import './kontaktinfo.less';
import VeilederinfoDel from './VeilederinfoDel/VeilederinfoDel';
import KontaktpersonRefusjoninfoDel from './KontaktpersonRefusjoninfoDel/KontaktpersonRefusjoninfoDel';

const KontaktinfoSteg: FunctionComponent = () => {
    const { avtale, lagreAvtale } = useContext(AvtaleContext);

    return (
        <Innholdsboks>
            <DeltakerInfo oppsummeringside={false} />
            <DeltakerinfoDel />
            <ArbeidsgiverinfoDel />
            {avtale?.tiltakstype !== 'ARBEIDSTRENING' && <KontaktpersonRefusjoninfoDel />}
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

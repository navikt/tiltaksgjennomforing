import { AvtaleContext } from '@/AvtaleProvider';
import DeltakerInfo from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/DeltakerInfo';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import React, { FunctionComponent, useContext } from 'react';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';
import Relasjoner from './ArbeidsgiverinfoDel/Relasjoner';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import './kontaktinfo.less';
import KontaktpersonRefusjoninfoDel from './KontaktpersonRefusjoninfoDel/KontaktpersonRefusjoninfoDel';
import VeilederinfoDel from './VeilederinfoDel/VeilederinfoDel';

const KontaktinfoSteg: FunctionComponent = () => {
    const { avtale, lagreAvtale } = useContext(AvtaleContext);

    const skalViseKontaktpersonForRefusjon = [
        'SOMMERJOBB',
        'MIDLERTIDIG_LONNSTILSKUDD',
        'VARIG_LONNSTILSKUDD',
    ].includes(avtale.tiltakstype);
    const skalViseRelasjoner = [
        'SOMMERJOBB',
        'MIDLERTIDIG_LONNSTILSKUDD',
        'VARIG_LONNSTILSKUDD',
        'INKLUDERINGSTILSKUDD',
        'MENTOR',
    ].includes(avtale.tiltakstype);

    return (
        <Innholdsboks>
            <DeltakerInfo oppsummeringside={false} />
            <DeltakerinfoDel />
            <ArbeidsgiverinfoDel />
            {skalViseKontaktpersonForRefusjon && <KontaktpersonRefusjoninfoDel />}
            {skalViseRelasjoner && <Relasjoner tiltakstype={avtale.tiltakstype} />}
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

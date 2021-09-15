import { AvtaleContext } from '@/AvtaleProvider';
import KontorInfo from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/KontorInfo';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import Innholdsboks from '@/komponenter/Innholdsboks/Innholdsboks';
import LagreKnapp from '@/komponenter/LagreKnapp/LagreKnapp';
import React, { FunctionComponent, useContext } from 'react';
import ArbeidsgiverinfoDel from './ArbeidsgiverinfoDel/ArbeidsgiverinfoDel';
import DeltakerinfoDel from './DeltakerinfoDel/DeltakerinfoDel';
import './kontaktinfo.less';
import VeilederinfoDel from './VeilederinfoDel/VeilederinfoDel';

const KontaktinfoSteg: FunctionComponent = () => {
    const { lagreAvtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

    return (
        <Innholdsboks>
            {innloggetBruker.rolle === 'VEILEDER' && <KontorInfo oppsummeringside={false} />}
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

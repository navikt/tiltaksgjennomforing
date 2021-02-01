import { DeltakerOgBedriftFilter } from '@/AvtaleOversikt/Filtrering/DeltakerOgBedriftFilter';
import StatusFilter from '@/AvtaleOversikt/Filtrering/StatusFilter';
import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import { Avtale, TilskuddPeriodeStatus } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import * as React from 'react';
import { FunctionComponent } from 'react';
import './Filtrering.less';

const cls = BEMHelper('filtrering');

export type FiltreringProps = {
    navEnheter?: string[];
    endreSøk: (
        søkekriterier: Partial<Avtale> & { tilskuddPeriodeStatus?: TilskuddPeriodeStatus; navEnhet?: string }
    ) => void;
};

const VeilederFiltrering: FunctionComponent<FiltreringProps> = props => {
    return (
        <div className={cls.className}>
            <DeltakerOgBedriftFilter {...props} />
            <TiltakstypeFilter {...props} erBeslutter={false} />
            <StatusFilter {...props} />
        </div>
    );
};

export default VeilederFiltrering;

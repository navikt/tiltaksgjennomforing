import { DeltakerOgBedriftFilter } from '@/AvtaleOversikt/Filtrering/DeltakerOgBedriftFilter';
import StatusFilter from '@/AvtaleOversikt/Filtrering/StatusFilter';
import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import Sortering from '@/AvtaleOversikt/Sortering';
import { Avtale, TilskuddPeriodeStatus } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import React, { FunctionComponent } from 'react';
import './Filtrering.less';

const cls = BEMHelper('filtrering');

export type FiltreringProps = {
    navEnheter?: string[];
    endreSøk: (
        søkekriterier: Partial<Avtale> & {
            tilskuddPeriodeStatus?: TilskuddPeriodeStatus;
            navEnhet?: string;
            avtaleNr?: number;
        }
    ) => void;
};

const VeilederFiltrering: FunctionComponent<FiltreringProps> = props => {
    return (
        <div className={cls.className}>
            <Sortering endreSøk={props.endreSøk} />
            <DeltakerOgBedriftFilter {...props} />
            <TiltakstypeFilter {...props} erBeslutter={false} />
            <StatusFilter {...props} />
        </div>
    );
};

export default VeilederFiltrering;

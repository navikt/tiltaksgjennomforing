import { DeltakerOgBedriftFilter } from '@/AvtaleOversikt/Filtrering/DeltakerOgBedriftFilter';
import StatusFilter from '@/AvtaleOversikt/Filtrering/StatusFilter';
import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import { Avtale } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import * as React from 'react';
import { FunctionComponent } from 'react';
import './Filtrering.less';

const cls = BEMHelper('filtrering');

export type FiltreringProps = { endreSøk: (søkekriterier: Partial<Avtale>) => void };

const VeilederFiltrering: FunctionComponent<FiltreringProps> = props => {
    return (
        <div className={cls.className}>
            <DeltakerOgBedriftFilter {...props} />
            <TiltakstypeFilter {...props} />
            <StatusFilter {...props} />
        </div>
    );
};

export default VeilederFiltrering;

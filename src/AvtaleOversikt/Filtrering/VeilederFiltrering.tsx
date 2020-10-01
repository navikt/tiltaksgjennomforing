import { DeltakerOgBedriftFilter } from '@/AvtaleOversikt/Filtrering/DeltakerOgBedriftFilter';
import StatusFilter from '@/AvtaleOversikt/Filtrering/StatusFilter';
import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import { Avtale } from '@/types/avtale';
import BEMHelper from '@/utils/bem';
import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import './Filtrering.less';

const cls = BEMHelper('filtrering');

export type FiltreringProps = { endreSøk: (søkekriterier: Partial<Avtale>) => void };

const VeilederFiltrering: FunctionComponent<FiltreringProps> = props => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const lonnstilskuddToggle = featureToggleContext[Feature.Lonnstilskudd];

    return (
        <div className={cls.className}>
            <DeltakerOgBedriftFilter {...props} />
            {lonnstilskuddToggle && <TiltakstypeFilter {...props} />}
            <StatusFilter {...props} />
        </div>
    );
};

export default VeilederFiltrering;

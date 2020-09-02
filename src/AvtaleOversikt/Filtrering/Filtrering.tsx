import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import TiltakstypeFilter from '@/AvtaleOversikt/Filtrering/TiltakstypeFilter';
import BEMHelper from '@/utils/bem';
import './Filtrering.less';
import { Avtale } from '@/types/avtale';
import { DeltakerOgBedriftFilter } from '@/AvtaleOversikt/Filtrering/DeltakerOgBedriftFilter';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import StatusFilter from '@/AvtaleOversikt/Filtrering/StatusFilter';

const cls = BEMHelper('filtrering');

export type FiltreringProps = { endreSøk: (søkekriterier: Partial<Avtale>) => void };

const Filtrering: FunctionComponent<FiltreringProps> = props => {
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

export default Filtrering;

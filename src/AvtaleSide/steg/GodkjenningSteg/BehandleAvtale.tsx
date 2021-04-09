import { AvtaleContext } from '@/AvtaleProvider';
import LaasOppKnapp from '@/AvtaleSide/steg/GodkjenningSteg/Versjonering/LaasOppKnapp';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import React, { FunctionComponent, useContext } from 'react';

const BehandleAvtale: FunctionComponent = () => {
    const avtaleContext = useContext(AvtaleContext);
    const status = avtaleContext.avtale.statusSomEnum;
    const kanLåsesOpp = avtaleContext.avtale.kanLåsesOpp;

    const featureToggleContext = useContext(FeatureToggleContext);
    const behandleAvtaleToggle = featureToggleContext[Feature.BehandleAvtale];

    return (
        <>
            {behandleAvtaleToggle && status === 'KLAR_FOR_OPPSTART' && <LaasOppKnapp laasOpp={avtaleContext.laasOpp} />}
            {!behandleAvtaleToggle && kanLåsesOpp && <LaasOppKnapp laasOpp={avtaleContext.laasOpp} />}
        </>
    );
};

export default BehandleAvtale;

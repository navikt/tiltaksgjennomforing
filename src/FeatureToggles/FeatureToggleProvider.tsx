import React, { createContext, useEffect, useState } from 'react';

import { hentFeatureToggles } from '@/services/rest-service';

export const FeatureToggleProviderInitialState = {
    visNedetidBanner: false,
    visHvemHarGodkjent: false,
    pabegyntAvtaleRyddeJobb: false,
    migreringSkrivebeskyttet: false,
    firearigLonnstilskudd: false,
} as const;

export type Feature = keyof typeof FeatureToggleProviderInitialState;

export type FeatureToggles = Record<Feature, boolean>;

export const FeatureToggleContext = createContext<FeatureToggles>(FeatureToggleProviderInitialState);

export const FeatureToggleProvider = (props: React.PropsWithChildren) => {
    const [featureToggles, setFeatureToggles] = useState<FeatureToggles>(FeatureToggleProviderInitialState);

    useEffect(() => {
        hentFeatureToggles(Object.keys(FeatureToggleProviderInitialState) as Feature[]).then(setFeatureToggles);
    }, [setFeatureToggles]);

    return <FeatureToggleContext.Provider value={featureToggles}>{props.children}</FeatureToggleContext.Provider>;
};

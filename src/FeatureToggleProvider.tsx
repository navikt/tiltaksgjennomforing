import React, { createContext, useContext, useEffect, useState } from 'react';

import { hentFeatureToggles } from './services/rest-service';

const InitialState = {
    visNedetidBanner: false,
    vtaoTiltakToggle: false,
    visHvemHarGodkjent: false,
    'arbeidstrening-readonly': false,
} as const;

export type Feature = keyof typeof InitialState;

export type FeatureToggles = Record<Feature, boolean>;

const FeatureToggleContext = createContext<FeatureToggles>(InitialState);

export const useFeatureToggles = () => useContext(FeatureToggleContext);

export const FeatureToggleProvider = (props: React.PropsWithChildren) => {
    const [featureToggles, setFeatureToggles] = useState<FeatureToggles>(InitialState);

    useEffect(() => {
        hentFeatureToggles(Object.keys(InitialState) as Feature[]).then(setFeatureToggles);
    }, [setFeatureToggles]);

    return <FeatureToggleContext.Provider value={featureToggles}>{props.children}</FeatureToggleContext.Provider>;
};

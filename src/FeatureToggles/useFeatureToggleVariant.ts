import { useEffect, useState } from 'react';

import { hentFeatureTogglesVarianter } from '@/services/rest-service';

import { FeatureToggleProviderInitialState, Feature } from './FeatureToggleProvider';

export type FeatureToggleVariant = { enabled: boolean; payload?: { type: string; value: null | string } };

export type FeatureToggleVariants = Record<Feature, FeatureToggleVariant>;

const InitialState = Object.keys(FeatureToggleProviderInitialState).reduce(
    (acc, feature) => ({
        ...acc,
        [feature]: { enabled: false },
    }),
    {},
) as FeatureToggleVariants;

export const useFeatureToggleVariant = () => {
    const [variant, setVariant] = useState<FeatureToggleVariants>(InitialState);

    useEffect(() => {
        hentFeatureTogglesVarianter(Object.keys(FeatureToggleProviderInitialState) as Feature[]).then(setVariant);
    }, [setVariant]);

    return variant;
};

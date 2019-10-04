import React, { createContext, useEffect, useState } from 'react';
import restService from './services/rest-service';

export enum Feature {
    Lonnstilskudd = 'tag.tiltak.lonnstilskudd',
}

const alleFeatures = [Feature.Lonnstilskudd];

export interface FeatureToggles {
    [toggles: string]: boolean;
}

export const FeatureToggleContext = createContext<FeatureToggles>({});

export const FeatureToggleProvider = (props: any) => {
    const [featureToggles, setFeatureToggles] = useState<FeatureToggles>({});

    const hentToggles = () => {
        restService.hentFeatureToggles(alleFeatures).then(setFeatureToggles);
    };

    useEffect(() => {
        hentToggles();
    }, []);

    return (
        <FeatureToggleContext.Provider value={featureToggles}>
            {props.children}
        </FeatureToggleContext.Provider>
    );
};

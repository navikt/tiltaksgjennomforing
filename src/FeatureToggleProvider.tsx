import React, { createContext, useEffect, useState } from 'react';
import restService from './services/rest-service';
import enumValues from './utils/enumUtils';

export enum Feature {
    'tag.tiltak.lonnstilskudd' = 'tag.tiltak.lonnstilskudd',
}

export interface FeatureToggles {
    [toggles: string]: boolean;
}

export const FeatureToggleContext = createContext<FeatureToggles>({});

export const FeatureToggleProvider = (props: any) => {
    const [featureToggles, setFeatureToggles] = useState<FeatureToggles>({});

    const hentToggles = () => {
        restService
            .hentFeatureToggles(enumValues(Feature))
            .then(setFeatureToggles);
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

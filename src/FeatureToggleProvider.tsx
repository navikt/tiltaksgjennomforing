import React, { createContext, useEffect, useState } from 'react';
import restService from './services/rest-service';

export enum Feature {
    Lonnstilskudd = 'tag.tiltak.lonnstilskudd',
    Kontortilgang = 'tag.tiltak.ny.veiledertilgang',
    LaasOppKnapp = 'tag.tiltak.laasoppknapp', // Legger du til ny feature her, ma den også inn i alleFeatures[]
}
const alleFeatures = [Feature.Lonnstilskudd, Feature.Kontortilgang, Feature.LaasOppKnapp];

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

    return <FeatureToggleContext.Provider value={featureToggles}>{props.children}</FeatureToggleContext.Provider>;
};

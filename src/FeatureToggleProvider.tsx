import React, { createContext, useEffect, useState } from 'react';
import { hentFeatureToggles } from './services/rest-service';

export enum Feature {
    Lonnstilskudd = 'tag.tiltak.lonnstilskudd',
    DelLenkeViaSms = 'tag.tiltak.dellenkeviasms',
    Mentor = 'tag.tiltak.mentor',
    ArbeidsoppgaverFritekst = 'tag.tiltak.arbeidsoppgaver.fritekst',
    ArbeidsgiverOppretter = 'tag.tiltak.arbeidsgiver.oppretter',
}

export const alleFeatures = Object.values(Feature);

export interface FeatureToggles {
    [toggles: string]: boolean;
}

export const FeatureToggleContext = createContext<FeatureToggles>({});

export const FeatureToggleProvider = (props: any) => {
    const [featureToggles, setFeatureToggles] = useState<FeatureToggles>({});

    const hentToggles = () => {
        hentFeatureToggles(alleFeatures).then(setFeatureToggles);
    };

    useEffect(() => {
        hentToggles();
    }, []);

    return <FeatureToggleContext.Provider value={featureToggles}>{props.children}</FeatureToggleContext.Provider>;
};

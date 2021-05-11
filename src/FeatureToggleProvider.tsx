import React, { createContext, useEffect, useState } from 'react';
import { hentFeatureToggles } from './services/rest-service';

export enum Feature {
    Mentor = 'tag.tiltak.mentor',
    VisningAvTilskuddsPerioder = 'tag.tiltak.viseTilskuddsPerioder',
    VisningAvKnappHentKontonummerForArbeidsgiver = 'tag.tiltak.viseHentArbeidsgiverKontonummer',
    VisNedetidBanner = 'tag.tiltak.visNedetidBanner',
    ViseBeslutterKnapp = 'tag.tiltak.viseBeslutterLogin',
    LagreSomPdf = 'tag.tiltak.lagreSomPdf',
    Sommerjobb = 'tag.tiltak.sommerjobb',
    BehandleAvtale = 'tag.tiltak.behandleAvtale',
    AnnullerAvtale = 'tag.tiltak.annullerAvtale',
    AvtaleStatusRefactor = 'tag.tiltak.avtaleStatusRefactor',
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

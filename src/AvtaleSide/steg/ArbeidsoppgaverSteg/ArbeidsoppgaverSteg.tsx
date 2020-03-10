import * as React from 'react';
import { FunctionComponent, useContext } from 'react';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import NyttArbeidsoppgaverSteg from '@/AvtaleSide/steg/ArbeidsoppgaverSteg/NyttArbeidsoppgaverSteg';
import GamleArbeidsoppgaverSteg from '@/AvtaleSide/steg/ArbeidsoppgaverSteg/GamleArbeidsoppgaverSteg';

// Når toggle slettes skal NyttArbeidsoppgaverSteg inlines her og GamleArbeidsoppgaverSteg slettes
export const ArbeidsoppgaverSteg: FunctionComponent = () => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const fritekstToggle = featureToggleContext[Feature.ArbeidsoppgaverFritekst];

    return fritekstToggle ? <NyttArbeidsoppgaverSteg /> : <GamleArbeidsoppgaverSteg />;
};

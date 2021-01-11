import React, { useContext } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import TilskuddsPerioder from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioder';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';

const TilskuddsPerioderOppsummering = () => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const visningAvtilskuddsPeriodeToggle = featureToggleContext[Feature.VisningAvTilskuddsPerioder];

    return visningAvtilskuddsPeriodeToggle ? (
        <>
            <Undertittel>Perioder for lønntilskudd</Undertittel>
            <VerticalSpacer rem={1} />
            <TilskuddsPerioder />
        </>
    ) : null;
};

export default TilskuddsPerioderOppsummering;

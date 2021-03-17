import { AvtaleContext } from '@/AvtaleProvider';
import TilskuddsPerioder from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioder';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Undertittel } from 'nav-frontend-typografi';
import React, { useContext } from 'react';

const TilskuddsPerioderOppsummering = () => {
    const featureToggleContext = useContext(FeatureToggleContext);
    const visningAvtilskuddsPeriodeToggle = featureToggleContext[Feature.VisningAvTilskuddsPerioder];
    const { avtale } = useContext(AvtaleContext);

    return visningAvtilskuddsPeriodeToggle ? (
        <>
            <Undertittel>Perioder for lønntilskudd</Undertittel>
            <VerticalSpacer rem={1} />
            <TilskuddsPerioder tilskuddsperioder={avtale.tilskuddPeriode} />
        </>
    ) : null;
};

export default TilskuddsPerioderOppsummering;

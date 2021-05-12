import { AvtaleContext } from '@/AvtaleProvider';
import TilskuddsPerioderArbeidsgiver from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioderArbeidsgiver';
import { Feature, FeatureToggleContext } from '@/FeatureToggleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Undertittel } from 'nav-frontend-typografi';
import React, { useContext } from 'react';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import TilskuddsPerioderVeileder from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioderVeileder';

const TilskuddsPerioderOppsummering = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const featureToggleContext = useContext(FeatureToggleContext);
    const visningAvtilskuddsPeriodeToggle = featureToggleContext[Feature.VisningAvTilskuddsPerioder];
    const { avtale } = useContext(AvtaleContext);

    return visningAvtilskuddsPeriodeToggle ? (
        <>
            <Undertittel>Tilskuddsperioder</Undertittel>
            <VerticalSpacer rem={1} />
            {innloggetBruker.rolle === 'ARBEIDSGIVER' && (
                <TilskuddsPerioderArbeidsgiver tilskuddsperioder={avtale.tilskuddPeriode} />
            )}
            {innloggetBruker.rolle === 'VEILEDER' && (
                <TilskuddsPerioderVeileder tilskuddsperioder={avtale.tilskuddPeriode} />
            )}
        </>
    ) : null;
};

export default TilskuddsPerioderOppsummering;

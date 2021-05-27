import { AvtaleContext } from '@/AvtaleProvider';
import TilskuddsPerioderArbeidsgiver from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioderArbeidsgiver';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Undertittel } from 'nav-frontend-typografi';
import React, { useContext } from 'react';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import TilskuddsPerioderVeileder from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioderVeileder';

const TilskuddsPerioderOppsummering = () => {
    const innloggetBruker = useContext(InnloggetBrukerContext);
    const { avtale } = useContext(AvtaleContext);

    return avtale.tilskuddPeriode.length > 0 && innloggetBruker.rolle !== 'DELTAKER' ? (
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

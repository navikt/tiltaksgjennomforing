import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Heading } from '@navikt/ds-react';
import React, { useContext } from 'react';
import VisningTilskuddsperioder from '@/AvtaleSide/steg/BeregningTilskudd/visningTilskuddsperioder/VisningTilskuddsperioder';

const TilskuddsPerioderOppsummering = () => {
    const { avtale } = useContext(AvtaleContext);

    if (avtale.tilskuddPeriode.length === 0) {
        return null;
    }

    return (
        <>
            <Heading size="small">Tilskuddsperioder</Heading>
            <VerticalSpacer rem={1} />
            <VisningTilskuddsperioder />
        </>
    );
};

export default TilskuddsPerioderOppsummering;

import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import TilskuddsPerioder from '@/AvtaleSide/steg/BeregningTilskudd/tilskuddsPerioder/TilskuddsPerioder';

const TilskuddsPerioderOppsummering = () => {
    return (
        <>
            <Undertittel>Perioder for lønntilskudd</Undertittel>
            <TilskuddsPerioder />
        </>
    );
};

export default TilskuddsPerioderOppsummering;

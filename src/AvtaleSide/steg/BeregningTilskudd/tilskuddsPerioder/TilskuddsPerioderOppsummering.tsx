import { AvtaleContext } from '@/AvtaleProvider';
import VerticalSpacer from '@/komponenter/layout/VerticalSpacer';
import { Undertittel } from 'nav-frontend-typografi';
import React, { useContext } from 'react';
import TilskuddperiodeBokser from '../TilskuddperiodeBokser';

const TilskuddsPerioderOppsummering = () => {
    const { avtale } = useContext(AvtaleContext);

    if (avtale.tilskuddPeriode.length === 0) {
        return null;
    }

    return (
        <>
            <Undertittel>Tilskuddsperioder</Undertittel>
            <VerticalSpacer rem={1} />
            <TilskuddperiodeBokser />
        </>
    );
};

export default TilskuddsPerioderOppsummering;

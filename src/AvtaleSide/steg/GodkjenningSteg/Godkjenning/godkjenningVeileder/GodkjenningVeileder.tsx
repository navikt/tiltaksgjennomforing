import React from 'react';
import { AvtaleContext, useAvtale } from '@/AvtaleProvider';

import GodkjennPaVegneAvDeltaker from './GodkjennPaVegneAvDeltaker';
import GodkjennPaVegneAvFlereParter from './GodkjennPaVegneAvFlereParter';

const GodkjenningVeileder = () => {
    const {
        avtale: { opphav },
    } = useAvtale();

    if (opphav === 'ARENA') {
        return <GodkjennPaVegneAvFlereParter />;
    }

    return <GodkjennPaVegneAvDeltaker />;
};

export default GodkjenningVeileder;

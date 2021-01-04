import { Feature } from '@/FeatureToggleProvider';
import { hentFeatureTogglesVarianter } from '@/services/rest-service';
import { Variant } from '@/types/unleash-variant';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import React, { FunctionComponent, useEffect, useState } from 'react';

export const VarselOmNedetid: FunctionComponent = () => {
    const [variant, setVariant] = useState<Variant>();

    useEffect(() => {
        hentFeatureTogglesVarianter([Feature.VisNedetidBanner])
            .then(varianter => {
                setVariant(varianter[Feature.VisNedetidBanner]);
            })
            .catch(() => {});
    }, []);

    if (variant && variant.enabled) {
        return (
            <AlertStripeAdvarsel>
                {variant.payload?.value || 'Vi opplever for tiden ustabilitet med løsningen for tiltaksgjennomføring'}
            </AlertStripeAdvarsel>
        );
    } else {
        return null;
    }
};

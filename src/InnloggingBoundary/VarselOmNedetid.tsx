import { Feature } from '@/FeatureToggleProvider';
import { hentFeatureTogglesVarianter } from '@/services/rest-service';
import { Variant } from '@/types/unleash-variant';
import { Alert } from '@navikt/ds-react';
import { FunctionComponent, useEffect, useState } from 'react';

export const VarselOmNedetid: FunctionComponent = () => {
    const [variant, setVariant] = useState<Variant>();

    useEffect(() => {
        hentFeatureTogglesVarianter([Feature.VisNedetidBanner])
            .then((varianter) => {
                setVariant(varianter[Feature.VisNedetidBanner]);
            })
            .catch(() => void 0);
    }, []);

    //MIDLERTIDIG BANNER FOR NEDETID PÅ BACKEND:
    return (
        <Alert variant="warning">
            Vi jobber for øyeblikket med vedlikehold. Tjenesten vil være helt eller delvis utilgjengelig i en kort
            periode.
        </Alert>
    );

    // if (variant && variant.enabled) {
    //     return (
    //         <Alert variant="warning">
    //             {variant.payload?.value || 'Vi opplever for tiden ustabilitet med løsningen for tiltaksgjennomføring'}
    //         </Alert>
    //     );
    // } else {
    //     return null;
    // }
};

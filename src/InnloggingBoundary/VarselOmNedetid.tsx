import { hentFeatureTogglesVarianter } from '@/services/rest-service';
import { Variant } from '@/types/unleash-variant';
import { Alert } from '@navikt/ds-react';
import { FunctionComponent, useEffect, useState } from 'react';

export const VarselOmNedetid: FunctionComponent = () => {
    const [variant, setVariant] = useState<Variant>();

    useEffect(() => {
        hentFeatureTogglesVarianter(['visNedetidBanner'])
            .then((varianter) => {
                setVariant(varianter['visNedetidBanner']);
            })
            .catch(() => void 0);
    }, []);

    if (variant && variant.enabled) {
        return (
            <Alert variant="warning">
                {variant.payload?.value || 'Vi opplever for tiden ustabilitet med løsningen for tiltaksgjennomføring'}
            </Alert>
        );
    } else {
        return null;
    }
};

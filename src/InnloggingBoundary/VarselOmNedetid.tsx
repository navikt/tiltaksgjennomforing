import { Alert } from '@navikt/ds-react';
import { useFeatureToggleVariant } from '@/FeatureToggles/useFeatureToggleVariant';

export const VarselOmNedetid = () => {
    const { visNedetidBanner } = useFeatureToggleVariant();

    if (visNedetidBanner.enabled) {
        return (
            <Alert variant="warning">
                {visNedetidBanner.payload?.value ||
                    'Vi opplever for tiden ustabilitet med løsningen for tiltaksgjennomføring'}
            </Alert>
        );
    }

    return null;
};

import { Kostnadssted } from '@/AvtaleSide/steg/KontaktInformasjonSteg/kontorInfo/OppdatereKostnadssted';
import { Avtale } from '@/types/avtale';

export const finnKostnadssted = (avtale: Avtale): Kostnadssted => {
    if (avtale.enhetKostnadssted) {
        return {
            enhet: avtale.enhetKostnadssted,
            enhetsnavn: avtale.enhetsnavnKostnadssted ?? '',
        };
    } else if (avtale.enhetOppfolging) {
        return { enhet: avtale.enhetOppfolging, enhetsnavn: avtale.enhetsnavnOppfolging ?? '' };
    } else {
        return { enhet: avtale.enhetGeografisk ?? '', enhetsnavn: avtale.enhetsnavnGeografisk ?? '' };
    }
};

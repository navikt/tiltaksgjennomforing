import { Avtale, TiltaksType } from '@/types';
import { useFeatureToggles } from '@/FeatureToggles/useFeatureToggles';

const TILTAK_SOM_ER_SKRIVEBESKYTTET: TiltaksType[] = ['MENTOR'];

export const useMigreringSkrivebeskyttet = () => {
    const { migreringSkrivebeskyttet } = useFeatureToggles();
    return (tiltakEllerAvtale: TiltaksType | Avtale): boolean => {
        const tiltak = typeof tiltakEllerAvtale === 'string' ? tiltakEllerAvtale : tiltakEllerAvtale.tiltakstype;
        return migreringSkrivebeskyttet && TILTAK_SOM_ER_SKRIVEBESKYTTET.includes(tiltak);
    };
};

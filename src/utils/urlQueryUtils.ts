import React from 'react';
import { useLocation } from 'react-router-dom';
import { TiltaksType } from '../types/avtale';

export function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function isGyldigTiltakstype(val?: string | null): val is TiltaksType | undefined {
    const gyldigeTiltakstyper: TiltaksType[] = [
        'ARBEIDSTRENING',
        'INKLUDERINGSTILSKUDD',
        'MENTOR',
        'MIDLERTIDIG_LONNSTILSKUDD',
        'SOMMERJOBB',
        'VARIG_LONNSTILSKUDD',
    ];
    return gyldigeTiltakstyper.includes(val as TiltaksType);
}

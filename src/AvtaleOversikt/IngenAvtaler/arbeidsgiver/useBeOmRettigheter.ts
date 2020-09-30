import { useEffect, useState } from 'react';
import { BeOmRettigheterUrl, hentBeOmRettighetUrler } from '@/services/rest-service';
import { TiltaksType } from '@/types/avtale';

const useBeOmRettigheter = (orgNr?: string) => {
    const [beOmRettighetUrler, setBeOmRettighetUrler] = useState<BeOmRettigheterUrl[]>([]);
    useEffect(() => {
        if (orgNr) {
            hentBeOmRettighetUrler(orgNr).then(setBeOmRettighetUrler);
        }
    }, [orgNr]);

    const lagBeOmRettighetUrl = (valgtTiltakstype: TiltaksType) => {
        return beOmRettighetUrler.find(({ tiltakstype }) => valgtTiltakstype === tiltakstype)?.url || '';
    };

    return { beOmRettighetUrler, lagBeOmRettighetUrl };
};

export default useBeOmRettigheter;

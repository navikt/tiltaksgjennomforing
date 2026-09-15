import { useEffect, useState } from 'react';
import { awaitDecoratorData } from '@navikt/nav-dekoratoren-moduler';
import {
    preInnsending,
    hentGjeldendeSamtykke,
    hentSporingsSkriptUrl,
    hentSporingsID,
    SPORING_SCRIPT_ID,
    SPORING_ORIGIN,
    deaktiverSporing,
    aktiverSporing,
} from './sporing';

function InnblikkSporing() {
    const [harGittSamtykke, setHarGittSamtykke] = useState(false);

    useEffect(() => {
        let aktiv = true;

        const synkroniserSamtykke = () => {
            setHarGittSamtykke(hentGjeldendeSamtykke().consent.analytics);
        };

        void (async () => {
            try {
                await awaitDecoratorData();
                if (!aktiv) {
                    return;
                }
                synkroniserSamtykke();
            } catch {
                if (!aktiv) {
                    return;
                }
            }
        })();

        window.addEventListener('consentAllWebStorage', synkroniserSamtykke);
        window.addEventListener('refuseOptionalWebStorage', synkroniserSamtykke);

        return () => {
            aktiv = false;
            window.removeEventListener('consentAllWebStorage', synkroniserSamtykke);
            window.removeEventListener('refuseOptionalWebStorage', synkroniserSamtykke);
        };
    }, []);

    useEffect(() => {
        if (!harGittSamtykke) {
            deaktiverSporing();
            return;
        }

        const vertnavn = window.location.hostname;
        const nettstedsId = hentSporingsID(vertnavn);
        const skriptUrl = hentSporingsSkriptUrl(vertnavn);

        aktiverSporing();

        const eksisterendeSkript = document.getElementById(SPORING_SCRIPT_ID) as HTMLScriptElement | null;

        if (!nettstedsId) {
            return;
        }

        if (!window.beforeSendAnalytics) {
            window.beforeSendAnalytics = preInnsending();
        }

        if (eksisterendeSkript) {
            return;
        }

        const skript = document.createElement('script');
        skript.id = SPORING_SCRIPT_ID;
        skript.defer = true;
        skript.src = skriptUrl;
        skript.setAttribute('data-website-id', nettstedsId);
        skript.setAttribute('data-exclude-search', 'true');
        skript.setAttribute('data-before-send', 'beforeSendAnalytics');
        skript.setAttribute('data-tag', SPORING_ORIGIN);
        document.head.appendChild(skript);
    }, [harGittSamtykke]);

    useEffect(() => {
        return () => {
            const skript = document.getElementById(SPORING_SCRIPT_ID);
            skript?.remove();
            delete window.sporing;
            delete window.beforeSendAnalytics;
        };
    }, []);

    return null;
}

export default InnblikkSporing;

import { useEffect, useMemo, useState } from 'react';

import {
    awaitDecoratorData,
    createBeforeSendHandler,
    getCurrentConsent,
    getSporingScriptSrc,
    getWebsiteId,
    SPORING_SCRIPT_ID,
    SPORING_ORIGIN,
} from './sporing';

function SporingTracker() {
    const hostname = window.location.hostname;
    const websiteId = useMemo(() => getWebsiteId(hostname), [hostname]);
    const scriptSrc = useMemo(() => getSporingScriptSrc(hostname), [hostname]);
    const [canLoadTracker, setCanLoadTracker] = useState(false);

    useEffect(() => {
        let active = true;

        const syncConsent = () => {
            setCanLoadTracker(getCurrentConsent().consent.analytics);
        };

        void (async () => {
            try {
                await awaitDecoratorData();
                if (!active) return;
                syncConsent();
            } catch {
                if (!active) return;
            }
        })();

        window.addEventListener('consentAllWebStorage', syncConsent);
        window.addEventListener('refuseOptionalWebStorage', syncConsent);

        return () => {
            active = false;
            window.removeEventListener('consentAllWebStorage', syncConsent);
            window.removeEventListener('refuseOptionalWebStorage', syncConsent);
        };
    }, []);

    useEffect(() => {
        const existingScript = document.getElementById(SPORING_SCRIPT_ID) as HTMLScriptElement | null;

        if (!canLoadTracker) {
            existingScript?.remove();
            delete window.sporing;
            return;
        }

        if (!websiteId) return;

        if (!window.beforeSendHandler) {
            window.beforeSendHandler = createBeforeSendHandler();
        }

        if (existingScript) {
            return;
        }

        const script = document.createElement('script');
        script.id = SPORING_SCRIPT_ID;
        script.defer = true;
        script.src = scriptSrc;
        script.setAttribute('data-website-id', websiteId);
        script.setAttribute('data-exclude-search', 'true');
        script.setAttribute('data-before-send', 'beforeSendHandler');
        script.setAttribute('data-tag', SPORING_ORIGIN);
        document.head.appendChild(script);
    }, [canLoadTracker, scriptSrc, websiteId]);

    return null;
}

export default SporingTracker;

import { useEffect, useMemo, useState } from 'react';

import {
    awaitDecoratorData,
    createBeforeSendAnalytics,
    getCurrentConsent,
    getSporingScriptSrc,
    getWebsiteId,
    setSporingDisabled,
    SPORING_SCRIPT_ID,
    SPORING_ORIGIN,
} from './sporing';

function InnblikkSporing() {
    const hostname = window.location.hostname;
    const websiteId = useMemo(() => getWebsiteId(hostname), [hostname]);
    const scriptSrc = useMemo(() => getSporingScriptSrc(hostname), [hostname]);
    const [hasGivenConsent, setHasGivenConsent] = useState(false);

    useEffect(() => {
        let active = true;

        const syncConsent = () => {
            setHasGivenConsent(getCurrentConsent().consent.analytics);
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
        if (!hasGivenConsent) {
            setSporingDisabled(true);
            return;
        }

        setSporingDisabled(false);

        const existingScript = document.getElementById(SPORING_SCRIPT_ID) as HTMLScriptElement | null;

        if (!websiteId) return;

        if (!window.beforeSendAnalytics) {
            window.beforeSendAnalytics = createBeforeSendAnalytics();
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
        script.setAttribute('data-before-send', 'beforeSendAnalytics');
        script.setAttribute('data-tag', SPORING_ORIGIN);
        document.head.appendChild(script);
    }, [hasGivenConsent, scriptSrc, websiteId]);

    useEffect(() => {
        return () => {
            const script = document.getElementById(SPORING_SCRIPT_ID);
            script?.remove();
            delete window.sporing;
            delete window.beforeSendAnalytics;
        };
    }, []);

    return null;
}

export default InnblikkSporing;

import { matchPath } from 'react-router-dom';

import { basename, Path } from '@/Router';

export const SPORING_ORIGIN = 'Tiltaksgjennomforing';
export const SPORING_SCRIPT_ID = 'reops-sporing-script';
export const SPORING_SCRIPT_SRC_PROD = 'https://cdn.nav.no/team-researchops/sporing/sporing.js';
export const SPORING_SCRIPT_SRC_DEV = 'https://cdn.nav.no/team-researchops/sporing/sporing-dev.js';
export const SPORING_WEBSITE_ID_PROD = 'bcc79a56-3b7a-4605-8a1e-11f88fadfe55';
export const SPORING_WEBSITE_ID_DEV = 'c76ee4a2-0f48-4123-8bca-858841998da3';

export type PageType =
    | 'oversikt'
    | 'informasjonsside'
    | 'opprett-avtale-veileder'
    | 'opprett-avtale-arbeidsgiver'
    | 'avtale'
    | 'avtale-steg'
    | 'avtale-beslutter'
    | 'avtale-beslutter-tilskuddsperiode'
    | 'ikke-funnet';

const routePatterns: Array<{ path: string; pageType: PageType }> = [
    { path: Path.OVERSIKT, pageType: 'oversikt' },
    { path: Path.INFORMASJONSSIDE, pageType: 'informasjonsside' },
    { path: Path.OPPRETT_AVTALE, pageType: 'opprett-avtale-veileder' },
    { path: Path.OPPRETT_AVTALE_ARBEIDSGIVER, pageType: 'opprett-avtale-arbeidsgiver' },
    { path: Path.AVTALE_BESLUTTER_TILSKUDDSPERIODE, pageType: 'avtale-beslutter-tilskuddsperiode' },
    { path: Path.AVTALE_BESLUTTER, pageType: 'avtale-beslutter' },
    { path: Path.AVTALE_STEG, pageType: 'avtale-steg' },
    { path: Path.AVTALE, pageType: 'avtale' },
];

export function getPageType(pathname: string): PageType {
    const path = pathname.replace(basename, '') || '/';
    const match = routePatterns.find(({ path: pattern }) => matchPath({ path: pattern, end: true }, path));
    return match?.pageType ?? 'ikke-funnet';
}

export function getWebsiteId(hostname: string): string | undefined {
    return isDevelopmentHostname(hostname) ? SPORING_WEBSITE_ID_DEV : SPORING_WEBSITE_ID_PROD;
}

export function getSporingScriptSrc(hostname: string): string {
    return isDevelopmentHostname(hostname) ? SPORING_SCRIPT_SRC_DEV : SPORING_SCRIPT_SRC_PROD;
}

type AnalyticsPayload = Record<string, unknown> & {
    url?: string;
    referrer?: string;
};

type BeforeSendHandler = (type: string, payload: AnalyticsPayload) => AnalyticsPayload;

export function createBeforeSendHandler(): BeforeSendHandler {
    return (_type, payload) => {
        const nextPayload = { ...payload };

        if (typeof nextPayload.url === 'string') {
            nextPayload.url = redactTrackingValue(nextPayload.url);
        }

        if (typeof nextPayload.referrer === 'string') {
            nextPayload.referrer = redactTrackingValue(nextPayload.referrer);
        }

        const pageType = getPageType(window.location.pathname);
        nextPayload.name = pageType;
        nextPayload.tag = SPORING_ORIGIN;
        nextPayload.origin = SPORING_ORIGIN;
        nextPayload.pageType = pageType;

        return nextPayload;
    };
}

export function redactTrackingValue(value: string): string {
    const maskedNavIdent = value.replace(/[A-Za-z]\d{6}/g, '*******');
    return maskedNavIdent.replace(/\b\d{11}\b/g, '***********');
}

export function awaitDecoratorData(timeoutMs = 5000): Promise<void> {
    return new Promise((resolve, reject) => {
        let settled = false;
        let retryTimeoutId: number | undefined;

        const timeout = window.setTimeout(() => {
            settled = true;
            if (retryTimeoutId !== undefined) {
                window.clearTimeout(retryTimeoutId);
            }
            reject(new Error(`Timed out after ${timeoutMs}ms waiting for decorator data.`));
        }, timeoutMs);

        const checkForDecoratorData = () => {
            if (settled) {
                return;
            }

            if (window.__DECORATOR_DATA__ && window.webStorageController) {
                settled = true;
                window.clearTimeout(timeout);
                if (retryTimeoutId !== undefined) {
                    window.clearTimeout(retryTimeoutId);
                }
                resolve();
                return;
            }

            retryTimeoutId = window.setTimeout(checkForDecoratorData, 50);
        };

        checkForDecoratorData();
    });
}

export function getCurrentConsent() {
    return (
        window.webStorageController?.getCurrentConsent() ?? {
            consent: { analytics: false, surveys: false },
        }
    );
}

function isDevelopmentHostname(hostname: string): boolean {
    return (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.includes('.dev.nav.no') ||
        hostname.includes('.dev.intern.nav.no')
    );
}

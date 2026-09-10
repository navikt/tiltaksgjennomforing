import { matchPath } from 'react-router-dom';

import { basename, Path } from '@/Router';

export const SPORING_ORIGIN = 'Tiltaksgjennomforing';
export const SPORING_SCRIPT_ID = 'reops-sporing-script';
export const SPORING_SCRIPT_SRC_PROD = 'https://cdn.nav.no/team-researchops/sporing/sporing.js';
export const SPORING_SCRIPT_SRC_DEV = 'https://cdn.nav.no/team-researchops/sporing/sporing-dev.js';
export const SPORING_ID_PROD = 'bcc79a56-3b7a-4605-8a1e-11f88fadfe55';
export const SPORING_ID_DEV = 'c76ee4a2-0f48-4123-8bca-858841998da3';

export type PageType =
    | 'oversikt'
    | 'informasjonsside'
    | 'opprett-avtale-veileder'
    | 'opprett-avtale-arbeidsgiver'
    | 'avtale'
    | 'avtale-steg'
    | 'avtale-beslutter'
    | 'avtale-beslutter-tilskuddsperiode'
    | 'ukjent-side';

const sider: Array<{ path: string; sideType: PageType }> = [
    { path: Path.OVERSIKT, sideType: 'oversikt' },
    { path: Path.INFORMASJONSSIDE, sideType: 'informasjonsside' },
    { path: Path.OPPRETT_AVTALE, sideType: 'opprett-avtale-veileder' },
    { path: Path.OPPRETT_AVTALE_ARBEIDSGIVER, sideType: 'opprett-avtale-arbeidsgiver' },
    { path: Path.AVTALE_BESLUTTER_TILSKUDDSPERIODE, sideType: 'avtale-beslutter-tilskuddsperiode' },
    { path: Path.AVTALE_BESLUTTER, sideType: 'avtale-beslutter' },
    { path: Path.AVTALE_STEG, sideType: 'avtale-steg' },
    { path: Path.AVTALE, sideType: 'avtale' },
];

export function hentSidetype(stiNavn: string): PageType {
    const sti = stiNavn.replace(basename, '') || '/';
    const treff = sider.find(({ path }) => matchPath({ path: path, end: true }, sti));
    return treff?.sideType ?? 'ukjent-side';
}

export function hentSporingsID(vertnavn: string): string | undefined {
    return erDevMiljo(vertnavn) ? SPORING_ID_DEV : SPORING_ID_PROD;
}

export function hentSporingsSkriptUrl(vertnavn: string): string {
    return erDevMiljo(vertnavn) ? SPORING_SCRIPT_SRC_DEV : SPORING_SCRIPT_SRC_PROD;
}

type BeforeSendAnalytics = (type: string, payload: Record<string, unknown>) => Record<string, unknown>;

export function preInnsending(): BeforeSendAnalytics {
    return (_type, payload) => {
        const nestePayload = { ...payload };

        if (typeof nestePayload.url === 'string') {
            nestePayload.url = maskerSporingsVerdi(nestePayload.url);
        }

        if (typeof nestePayload.referrer === 'string') {
            nestePayload.referrer = maskerSporingsVerdi(nestePayload.referrer);
        }

        const sidetype = hentSidetype(window.location.pathname);
        nestePayload.name = sidetype;
        nestePayload.tag = SPORING_ORIGIN;
        nestePayload.origin = SPORING_ORIGIN;
        nestePayload.pageType = sidetype;

        return nestePayload;
    };
}

export function maskerSporingsVerdi(verdi: string): string {
    const maskertNavIdent = verdi.replace(/[A-Za-z]\d{6}/g, '*******');
    return maskertNavIdent.replace(/\b\d{11}\b/g, '***********');
}

export function hentGjeldendeSamtykke() {
    return (
        window.webStorageController?.getCurrentConsent() ?? {
            consent: { analytics: false, surveys: false },
        }
    );
}

export function deaktiverSporing(): void {
    try {
        window.localStorage.setItem('sporing.disabled', '1');
    } catch {
        // setItem kan kaste feil hvis lagring er fult eller blokkert av strengere cookie settings
    }
}

export function aktiverSporing(): void {
    window.localStorage.removeItem('sporing.disabled');
}

export function erSporingDeaktivert(): boolean {
    return window.localStorage.getItem('sporing.disabled') === '1';
}

function erDevMiljo(vertsnavn: string): boolean {
    return (
        vertsnavn === 'localhost' ||
        vertsnavn === '127.0.0.1' ||
        vertsnavn.includes('.dev.nav.no') ||
        vertsnavn.includes('.dev.intern.nav.no')
    );
}

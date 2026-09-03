import { cleanup, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, expect, test, vi } from 'vitest';
import InnblikkSporing from './InnblikkSporing';
import {
    preInnsending,
    hentGjeldendeSamtykke,
    hentSidetype,
    hentSporingsSkriptUrl,
    maskerSporingsVerdi,
    SPORING_ID_DEV,
    SPORING_ORIGIN,
    SPORING_SCRIPT_SRC_DEV,
    SPORING_SCRIPT_SRC_PROD,
    aktiverSporing,
    erSporingDeaktivert,
} from './sporing';
import { awaitDecoratorData } from '@navikt/nav-dekoratoren-moduler';

afterEach(() => {
    cleanup();
    document.head.querySelectorAll('#reops-sporing-script').forEach((node) => node.remove());
    aktiverSporing();
    vi.restoreAllMocks();
    delete window.__DECORATOR_DATA__;
    delete window.webStorageController;
    delete window.sporing;
    delete window.beforeSendAnalytics;
});

test('mapper ruter til sidetype', () => {
    expect(hentSidetype('/tiltaksgjennomforing/')).toBe('oversikt');
    expect(hentSidetype('/tiltaksgjennomforing/informasjonsside')).toBe('informasjonsside');
    expect(hentSidetype('/tiltaksgjennomforing/avtale/123/kontaktinformasjon')).toBe('avtale-steg');
    expect(hentSidetype('/tiltaksgjennomforing/hva-er-dette')).toBe('ukjent-side');
});

test('bruker riktig skriptkilde per miljø', () => {
    expect(hentSporingsSkriptUrl('localhost')).toBe(SPORING_SCRIPT_SRC_DEV);
    expect(hentSporingsSkriptUrl('innblikk.ansatt.dev.nav.no')).toBe(SPORING_SCRIPT_SRC_DEV);
    expect(hentSporingsSkriptUrl('innblikk.ansatt.nav.no')).toBe(SPORING_SCRIPT_SRC_PROD);
});

test('maskerer identifikatorer fra URL', () => {
    expect(maskerSporingsVerdi('https://example.test/?fnr=12345678901&navident=A123456')).toBe(
        'https://example.test/?fnr=***********&navident=*******',
    );
});

test('preInnsending legger til origin og sidetype', () => {
    const behandler = preInnsending();
    const resultat = behandler('event', { url: 'https://example.test/?foo=bar', referrer: 'https://nav.no/A123456' });

    expect(resultat).toMatchObject({
        name: 'oversikt',
        origin: SPORING_ORIGIN,
        tag: SPORING_ORIGIN,
        pageType: 'oversikt',
        url: 'https://example.test/?foo=bar',
        referrer: 'https://nav.no/*******',
    });
});

test('venter på dekoratordata', async () => {
    const venteLofte = awaitDecoratorData();

    setTimeout(() => {
        window.__DECORATOR_DATA__ = {};
        window.webStorageController = {
            getCurrentConsent: () => ({ consent: { analytics: true, surveys: false } }),
        };
    }, 0);

    await expect(venteLofte).resolves.toBe(true);
    expect(hentGjeldendeSamtykke().consent.analytics).toBe(true);
});

test('laster ikke skript før samtykke', async () => {
    window.__DECORATOR_DATA__ = {};
    window.webStorageController = {
        getCurrentConsent: () => ({ consent: { analytics: false, surveys: false } }),
    };
    const appendSpion = vi.spyOn(document.head, 'appendChild');

    render(
        <MemoryRouter initialEntries={['/tiltaksgjennomforing/']}>
            <InnblikkSporing />
        </MemoryRouter>,
    );

    await waitFor(() => expect(appendSpion).not.toHaveBeenCalled());
    await waitFor(() => expect(erSporingDeaktivert()).toBe(true));
});

test('laster dev-skript etter samtykke til analyse', async () => {
    window.__DECORATOR_DATA__ = {};
    window.webStorageController = {
        getCurrentConsent: () => ({ consent: { analytics: true, surveys: false } }),
    };
    const appendSpion = vi.spyOn(document.head, 'appendChild').mockImplementation((node: Node) => node);

    render(
        <MemoryRouter initialEntries={['/tiltaksgjennomforing/']}>
            <InnblikkSporing />
        </MemoryRouter>,
    );

    await waitFor(() => expect(appendSpion).toHaveBeenCalledTimes(1));
    const skript = appendSpion.mock.calls[0][0] as HTMLScriptElement;

    expect(erSporingDeaktivert()).toBe(false);
    expect(skript.src).toBe(SPORING_SCRIPT_SRC_DEV);
    expect(skript.getAttribute('data-website-id')).toBe(SPORING_ID_DEV);
    expect(skript.getAttribute('data-exclude-search')).toBe('true');
    expect(skript.getAttribute('data-before-send')).toBe('beforeSendAnalytics');
    expect(skript.getAttribute('data-tag')).toBe(SPORING_ORIGIN);
});

test('reagerer på at samtykke gis etter mount', async () => {
    window.__DECORATOR_DATA__ = {};
    let analyticsConsent = false;
    window.webStorageController = {
        getCurrentConsent: () => ({ consent: { analytics: analyticsConsent, surveys: false } }),
    };
    const appendSpion = vi.spyOn(document.head, 'appendChild').mockImplementation((node: Node) => node);

    render(
        <MemoryRouter initialEntries={['/tiltaksgjennomforing/']}>
            <InnblikkSporing />
        </MemoryRouter>,
    );

    expect(appendSpion).not.toHaveBeenCalled();
    await waitFor(() => expect(erSporingDeaktivert()).toBe(true));

    analyticsConsent = true;
    window.dispatchEvent(new Event('consentAllWebStorage'));

    await waitFor(() => expect(appendSpion).toHaveBeenCalledTimes(1));
    expect(erSporingDeaktivert()).toBe(false);
});

test('deaktiverer sporing når samtykke tilbakekalles etter init', async () => {
    window.__DECORATOR_DATA__ = {};
    let analyticsConsent = true;
    window.webStorageController = {
        getCurrentConsent: () => ({ consent: { analytics: analyticsConsent, surveys: false } }),
    };

    render(
        <MemoryRouter initialEntries={['/tiltaksgjennomforing/']}>
            <InnblikkSporing />
        </MemoryRouter>,
    );

    await waitFor(() => expect(document.getElementById('reops-sporing-script')).not.toBeNull());
    expect(erSporingDeaktivert()).toBe(false);

    analyticsConsent = false;
    window.dispatchEvent(new Event('refuseOptionalWebStorage'));

    await waitFor(() => expect(erSporingDeaktivert()).toBe(true));
    expect(document.getElementById('reops-sporing-script')).not.toBeNull();
});

test('rydder opp sporing-skript og globale variabler ved unmount', async () => {
    window.__DECORATOR_DATA__ = {};
    window.webStorageController = {
        getCurrentConsent: () => ({ consent: { analytics: true, surveys: false } }),
    };

    const { unmount } = render(
        <MemoryRouter initialEntries={['/tiltaksgjennomforing/']}>
            <InnblikkSporing />
        </MemoryRouter>,
    );

    await waitFor(() => expect(document.getElementById('reops-sporing-script')).not.toBeNull());
    expect(window.beforeSendAnalytics).toBeTypeOf('function');

    unmount();

    expect(document.getElementById('reops-sporing-script')).toBeNull();
    expect(window.sporing).toBeUndefined();
    expect(window.beforeSendAnalytics).toBeUndefined();
});

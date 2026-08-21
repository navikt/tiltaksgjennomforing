import { cleanup, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, expect, test, vi } from 'vitest';

import InnblikkSporing from './InnblikkSporing';
import {
    awaitDecoratorData,
    createBeforeSendAnalytics,
    getCurrentConsent,
    getPageType,
    getSporingScriptSrc,
    redactTrackingValue,
    SPORING_DISABLED_KEY,
    SPORING_WEBSITE_ID_DEV,
    SPORING_ORIGIN,
    SPORING_SCRIPT_SRC_DEV,
    SPORING_SCRIPT_SRC_PROD,
} from './sporing';

afterEach(() => {
    cleanup();
    document.head.querySelectorAll('#reops-sporing-script').forEach((node) => node.remove());
    window.localStorage.removeItem(SPORING_DISABLED_KEY);
    vi.restoreAllMocks();
    delete window.__DECORATOR_DATA__;
    delete window.webStorageController;
    delete window.sporing;
    delete window.beforeSendAnalytics;
});

test('maps routes to page type', () => {
    expect(getPageType('/tiltaksgjennomforing/')).toBe('oversikt');
    expect(getPageType('/tiltaksgjennomforing/informasjonsside')).toBe('informasjonsside');
    expect(getPageType('/tiltaksgjennomforing/avtale/123/kontaktinformasjon')).toBe('avtale-steg');
    expect(getPageType('/tiltaksgjennomforing/hva-er-dette')).toBe('ikke-funnet');
});

test('uses correct script source per environment', () => {
    expect(getSporingScriptSrc('localhost')).toBe(SPORING_SCRIPT_SRC_DEV);
    expect(getSporingScriptSrc('innblikk.ansatt.dev.nav.no')).toBe(SPORING_SCRIPT_SRC_DEV);
    expect(getSporingScriptSrc('innblikk.ansatt.nav.no')).toBe(SPORING_SCRIPT_SRC_PROD);
});

test('redacts identifiers from urls', () => {
    expect(redactTrackingValue('https://example.test/?fnr=12345678901&navident=A123456')).toBe(
        'https://example.test/?fnr=***********&navident=*******',
    );
});

test('before-send handler adds origin and page type', () => {
    const handler = createBeforeSendAnalytics();
    const result = handler('event', { url: 'https://example.test/?foo=bar', referrer: 'https://nav.no/A123456' });

    expect(result).toMatchObject({
        name: 'oversikt',
        origin: SPORING_ORIGIN,
        tag: SPORING_ORIGIN,
        pageType: 'oversikt',
        url: 'https://example.test/?foo=bar',
        referrer: 'https://nav.no/*******',
    });
});

test('waits for decorator data', async () => {
    const promise = awaitDecoratorData(500);

    setTimeout(() => {
        window.__DECORATOR_DATA__ = {};
        window.webStorageController = {
            getCurrentConsent: () => ({ consent: { analytics: true, surveys: false } }),
        };
    }, 0);

    await expect(promise).resolves.toBeUndefined();
    expect(getCurrentConsent().consent.analytics).toBe(true);
});

test('stops polling after timeout', async () => {
    vi.useFakeTimers();

    try {
        const promise = awaitDecoratorData(100);
        const rejection = promise.catch((error: unknown) => error);

        await vi.advanceTimersByTimeAsync(100);

        await expect(rejection).resolves.toBeInstanceOf(Error);
        await expect(rejection).resolves.toMatchObject({
            message: 'Timed out after 100ms waiting for decorator data.',
        });
        expect(vi.getTimerCount()).toBe(0);
    } finally {
        vi.useRealTimers();
    }
});

test('does not load script before consent', async () => {
    window.__DECORATOR_DATA__ = {};
    window.webStorageController = {
        getCurrentConsent: () => ({ consent: { analytics: false, surveys: false } }),
    };
    const appendSpy = vi.spyOn(document.head, 'appendChild');

    render(
        <MemoryRouter initialEntries={['/tiltaksgjennomforing/']}>
            <InnblikkSporing />
        </MemoryRouter>,
    );

    await waitFor(() => expect(appendSpy).not.toHaveBeenCalled());
    await waitFor(() => expect(window.localStorage.getItem(SPORING_DISABLED_KEY)).toBe('1'));
});

test('loads dev script after analytics consent', async () => {
    window.__DECORATOR_DATA__ = {};
    window.webStorageController = {
        getCurrentConsent: () => ({ consent: { analytics: true, surveys: false } }),
    };
    const appendSpy = vi.spyOn(document.head, 'appendChild').mockImplementation((node: Node) => node);

    render(
        <MemoryRouter initialEntries={['/tiltaksgjennomforing/']}>
            <InnblikkSporing />
        </MemoryRouter>,
    );

    await waitFor(() => expect(appendSpy).toHaveBeenCalledTimes(1));
    const script = appendSpy.mock.calls[0][0] as HTMLScriptElement;

    expect(window.localStorage.getItem(SPORING_DISABLED_KEY)).toBeNull();
    expect(script.src).toBe(SPORING_SCRIPT_SRC_DEV);
    expect(script.getAttribute('data-website-id')).toBe(SPORING_WEBSITE_ID_DEV);
    expect(script.getAttribute('data-exclude-search')).toBe('true');
    expect(script.getAttribute('data-before-send')).toBe('beforeSendAnalytics');
    expect(script.getAttribute('data-tag')).toBe(SPORING_ORIGIN);
});

test('reacts to consent being granted after mount', async () => {
    window.__DECORATOR_DATA__ = {};
    let analyticsConsent = false;
    window.webStorageController = {
        getCurrentConsent: () => ({ consent: { analytics: analyticsConsent, surveys: false } }),
    };
    const appendSpy = vi.spyOn(document.head, 'appendChild').mockImplementation((node: Node) => node);

    render(
        <MemoryRouter initialEntries={['/tiltaksgjennomforing/']}>
            <InnblikkSporing />
        </MemoryRouter>,
    );

    expect(appendSpy).not.toHaveBeenCalled();
    await waitFor(() => expect(window.localStorage.getItem(SPORING_DISABLED_KEY)).toBe('1'));

    analyticsConsent = true;
    window.dispatchEvent(new Event('consentAllWebStorage'));

    await waitFor(() => expect(appendSpy).toHaveBeenCalledTimes(1));
    expect(window.localStorage.getItem(SPORING_DISABLED_KEY)).toBeNull();
});

test('disables tracking when consent is revoked after init', async () => {
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
    expect(window.localStorage.getItem(SPORING_DISABLED_KEY)).toBeNull();

    analyticsConsent = false;
    window.dispatchEvent(new Event('refuseOptionalWebStorage'));

    await waitFor(() => expect(window.localStorage.getItem(SPORING_DISABLED_KEY)).toBe('1'));
    expect(document.getElementById('reops-sporing-script')).not.toBeNull();
});

test('cleans up tracking script and globals on unmount', async () => {
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

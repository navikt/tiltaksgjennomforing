import { render, waitFor } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { MemoryRouter, useSearchParams } from 'react-router';
import { describe, expect, it } from 'vitest';

/**
 * Dokumenterer hvorfor App.tsx sender `useTransitions={false}` til RouterProvider.
 *
 * Fra React Router 7 pakkes ruter-state-oppdateringer i React.startTransition.
 * `setSearchParams` blir da en lavprioritetsoppdatering mens vanlig `setState`
 * er høyprioritet. React commiter den urgente først, og komponenten rendres med
 * ny state men gammel URL.
 *
 * FiltreringProvider og AvtaleOversikt utleder kontrollflyt fra nettopp den
 * sammenligningen (`searchParams.get('sokId') === data.sokId`). Mellomsteget
 * sendte GET /avtaler/sok uten sokId (HTTP 400) og låste tabellen i
 * skeleton-tilstand.
 *
 * Testen bruker MemoryRouter fordi data-routeren lager en `Request` ved
 * navigering, og jsdom sin AbortSignal krasjer mot Node sin undici-Request.
 * `useTransitions`-propen og startTransition-mekanismen er den samme.
 */

interface Render {
    urlSokId: string | null;
    stateSokId: string | null;
}

const rendreMed = async (useTransitions: boolean): Promise<Render[]> => {
    const renders: Render[] = [];

    const Komponent = () => {
        const [searchParams, setSearchParams] = useSearchParams();
        const [stateSokId, setStateSokId] = useState<string | null>(null);

        renders.push({ urlSokId: searchParams.get('sokId'), stateSokId });

        useEffect(() => {
            if (stateSokId !== null) return;
            // Samme rekkefølge som i FiltreringProvider sin .then()-callback:
            // først URL, så nettressurs-state.
            setSearchParams({ sokId: 'abc' }, { replace: true });
            setStateSokId('abc');
        }, [stateSokId, setSearchParams]);

        return <div>{stateSokId ?? 'tom'}</div>;
    };

    render(
        <MemoryRouter initialEntries={['/']} useTransitions={useTransitions}>
            <Komponent />
        </MemoryRouter>,
    );

    await waitFor(() => expect(renders.at(-1)?.urlSokId).toBe('abc'));
    return renders;
};

describe('useTransitions og synkronisering av URL mot state', () => {
    it('holder URL og state i takt når useTransitions er false', async () => {
        const renders = await rendreMed(false);

        const uenige = renders.filter((x) => x.stateSokId === 'abc' && x.urlSokId !== 'abc');
        expect(uenige).toEqual([]);
    });

    it('ender opp med riktig URL og state', async () => {
        const renders = await rendreMed(false);

        expect(renders.at(-1)).toEqual({ urlSokId: 'abc', stateSokId: 'abc' });
    });
});

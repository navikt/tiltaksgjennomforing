import { afterEach, expect, test } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { AlleredeRegistrertAvtale } from '@/types/avtale';
import AlleredeOpprettetAvtaleProvider, { useAlleredeOpprettetAvtale } from './AlleredeOpprettetAvtaleProvider';

const enAlleredeRegistrertAvtale: AlleredeRegistrertAvtale = {
    id: 'avtale-1',
    status: 'PÅBEGYNT',
} as AlleredeRegistrertAvtale;

const TestSide = () => {
    const { alleredeRegistrertAvtale, setAlleredeRegistrertAvtale } = useAlleredeOpprettetAvtale();
    const navigate = useNavigate();

    return (
        <div>
            <p>Antall avtaler: {alleredeRegistrertAvtale.avtaler.length}</p>
            <button
                onClick={() =>
                    setAlleredeRegistrertAvtale({
                        ...alleredeRegistrertAvtale,
                        avtaler: [enAlleredeRegistrertAvtale],
                        deltaker: '12345678910',
                    })
                }
            >
                Registrer allerede opprettet avtale
            </button>
            <button onClick={() => navigate('/oversikt/avtale/123/kontaktinformasjon')}>Naviger til avtale</button>
        </div>
    );
};

const AnnenSide = () => {
    const navigate = useNavigate();
    return (
        <div>
            <p>Annen side</p>
            <button onClick={() => navigate('/oversikt/opprett-avtale')}>Naviger til opprett-avtale</button>
        </div>
    );
};

const renderMedRouting = () =>
    render(
        <MemoryRouter initialEntries={['/oversikt/opprett-avtale']}>
            <AlleredeOpprettetAvtaleProvider>
                <Routes>
                    <Route path="/oversikt/opprett-avtale" element={<TestSide />} />
                    <Route path="/oversikt/avtale/:avtaleId/:steg" element={<AnnenSide />} />
                </Routes>
            </AlleredeOpprettetAvtaleProvider>
        </MemoryRouter>,
    );

afterEach(cleanup);

test('skal nullstille allerede-registrert-avtale-state når brukeren navigerer bort fra opprett-avtale-siden', async () => {
    renderMedRouting();

    fireEvent.click(screen.getByRole('button', { name: 'Registrer allerede opprettet avtale' }));
    expect(await screen.findByText('Antall avtaler: 1')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Naviger til avtale' }));
    expect(await screen.findByText('Annen side')).toBeTruthy();
});

test('skal ikke vise gammel advarsel når brukeren navigerer tilbake til opprett-avtale etter å ha forlatt siden', async () => {
    renderMedRouting();

    fireEvent.click(screen.getByRole('button', { name: 'Registrer allerede opprettet avtale' }));
    expect(await screen.findByText('Antall avtaler: 1')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Naviger til avtale' }));
    expect(await screen.findByText('Annen side')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Naviger til opprett-avtale' }));

    expect(await screen.findByText('Antall avtaler: 0')).toBeTruthy();
});

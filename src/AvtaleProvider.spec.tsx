import { expect, test } from 'vitest'

import { noenHarGodkjentMenIkkeInngått } from './AvtaleProvider';
import arbeidstreningAvtaleMock from './mocking/arbeidstrening-avtale-mock';

test('Godkjent av ingen', () => {
    const avtale = arbeidstreningAvtaleMock;
    const ikkeGodkjentAvtale = noenHarGodkjentMenIkkeInngått(avtale);
    expect(ikkeGodkjentAvtale).toBe(false);
});

test('Godkjent av noen, men ikke alle', () => {
    const avtale = arbeidstreningAvtaleMock;
    avtale.godkjentAvDeltaker = '2021-01-01T00:00:00.000';
    const godkjentAvDeltaker = noenHarGodkjentMenIkkeInngått(avtale);
    expect(godkjentAvDeltaker).toBe(true);
});

test('Godkjent av deltaker og ag, men ikke alle', () => {
    const avtale = arbeidstreningAvtaleMock;
    avtale.godkjentAvDeltaker = '2021-01-01T00:00:00.000';
    avtale.godkjentAvArbeidsgiver = '2021-01-01T00:00:00.000';
    const godkjentDeltakerOgArbeidsgiver = noenHarGodkjentMenIkkeInngått(avtale);
    expect(godkjentDeltakerOgArbeidsgiver).toBe(true);
});

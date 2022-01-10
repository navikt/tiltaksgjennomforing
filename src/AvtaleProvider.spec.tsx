import { shallow } from 'enzyme';
import React from 'react';
import AvtaleProvider, { AvtaleContext, Context, noenHarGodkjentMenIkkeAlle } from './AvtaleProvider';
import arbeidstreningAvtaleMock from './mocking/arbeidstrening-avtale-mock';

test('Test at AvtaleContext  ', () => {
    const wrapper = shallow(
        <AvtaleContext.Provider value={{ avtale: arbeidstreningAvtaleMock } as Context}>
            <AvtaleProvider />
        </AvtaleContext.Provider>
    );
    expect(wrapper).toHaveLength(1);
});

test('Godkjent av ingen', () => {
    const avtale = arbeidstreningAvtaleMock;
    const ikkeGodkjentAvtale = noenHarGodkjentMenIkkeAlle(avtale);
    expect(ikkeGodkjentAvtale).toBe(false);
});

test('Godkjent av noen, men ikke alle', () => {
    const avtale = arbeidstreningAvtaleMock;
    avtale.godkjentAvDeltaker = '2021-01-01T00:00:00.000';
    const godkjentAvDeltaker = noenHarGodkjentMenIkkeAlle(avtale);
    expect(godkjentAvDeltaker).toBe(true);
});

test('Godkjent av deltaker og ag, men ikke alle', () => {
    const avtale = arbeidstreningAvtaleMock;
    avtale.godkjentAvDeltaker = '2021-01-01T00:00:00.000';
    avtale.godkjentAvArbeidsgiver = '2021-01-01T00:00:00.000';
    const godkjentDeltakerOgArbeidsgiver = noenHarGodkjentMenIkkeAlle(avtale);
    expect(godkjentDeltakerOgArbeidsgiver).toBe(true);
});
test('Godkjent av alle', () => {
    const avtale = arbeidstreningAvtaleMock;
    avtale.godkjentAvDeltaker = '2021-01-01T00:00:00.000';
    avtale.godkjentAvArbeidsgiver = '2021-01-01T00:00:00.000';
    avtale.godkjentAvVeileder = '2021-01-01T00:00:00.000';
    const godkjnetAvAlle = noenHarGodkjentMenIkkeAlle(avtale);
    expect(godkjnetAvAlle).toBe(false);
});

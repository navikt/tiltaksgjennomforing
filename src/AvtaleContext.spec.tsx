import { shallow } from 'enzyme';
import React from 'react';
import AvtaleProvider, { noenHarGodkjentMenIkkeAlle } from './AvtaleProvider';
import arbeidstreningAvtaleMock from './mocking/arbeidstrening-avtale-mock';

test('Test at AvtaleContext  ', () => {
    const wrapper = shallow(<AvtaleProvider />);
    expect(wrapper).toHaveLength(1);
});

test('Godkjent av ingen', () => {
    const avtale = arbeidstreningAvtaleMock;
    const ikkeGodkjentAvtale = noenHarGodkjentMenIkkeAlle(avtale);
    expect(ikkeGodkjentAvtale).toBe(false);
});

test('Godkjent av noen, men ikke alle', () => {
    const avtale = arbeidstreningAvtaleMock;
    avtale.godkjentAvDeltaker = true;
    const godkjentAvDeltaker = noenHarGodkjentMenIkkeAlle(avtale);
    expect(godkjentAvDeltaker).toBe(true);
});

test('Godkjent av deltaker og ag, men ikke alle', () => {
    const avtale = arbeidstreningAvtaleMock;
    avtale.godkjentAvDeltaker = true;
    avtale.godkjentAvArbeidsgiver = true;
    const godkjentDeltakerOgArbeidsgiver = noenHarGodkjentMenIkkeAlle(avtale);
    expect(godkjentDeltakerOgArbeidsgiver).toBe(true);
});
test('Godkjent av alle', () => {
    const avtale = arbeidstreningAvtaleMock;
    avtale.godkjentAvDeltaker = true;
    avtale.godkjentAvArbeidsgiver = true;
    avtale.godkjentAvVeileder = true;
    const godkjnetAvAlle = noenHarGodkjentMenIkkeAlle(avtale);
    expect(godkjnetAvAlle).toBe(false);
});

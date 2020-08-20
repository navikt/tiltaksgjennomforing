import { shallow } from 'enzyme';
import React from 'react';
import { AvtaleProvider, noenHarGodkjentMenIkkeAlle, tomAvtale } from './AvtaleContext';

test('Test at AvtaleContext  ', () => {
    const wrapper = shallow(<AvtaleProvider />);
    expect(wrapper).toHaveLength(1);
});

test('Godkjent av ingen', () => {
    const avtale = tomAvtale;
    const ikkeGodkjentAvtale = noenHarGodkjentMenIkkeAlle(avtale);
    expect(ikkeGodkjentAvtale).toBe(false);
});

test('Godkjent av noen, men ikke alle', () => {
    const avtale = tomAvtale;
    avtale.godkjentAvDeltaker = true;
    const godkjentAvDeltaker = noenHarGodkjentMenIkkeAlle(avtale);
    expect(godkjentAvDeltaker).toBe(true);
});

test('Godkjent av deltaker og ag, men ikke alle', () => {
    const avtale = tomAvtale;
    avtale.godkjentAvDeltaker = true;
    avtale.godkjentAvArbeidsgiver = true;
    const godkjentDeltakerOgArbeidsgiver = noenHarGodkjentMenIkkeAlle(avtale);
    expect(godkjentDeltakerOgArbeidsgiver).toBe(true);
});
test('Godkjent av alle', () => {
    const avtale = tomAvtale;
    avtale.godkjentAvDeltaker = true;
    avtale.godkjentAvArbeidsgiver = true;
    avtale.godkjentAvVeileder = true;
    const godkjnetAvAlle = noenHarGodkjentMenIkkeAlle(avtale);
    expect(godkjnetAvAlle).toBe(false);
});

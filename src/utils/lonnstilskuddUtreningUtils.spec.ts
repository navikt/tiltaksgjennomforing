import {
    arbeidsgiveravgift,
    feriepenger,
    lonnHundreProsent,
    obligTjenestepensjon,
    sumLonnFeriePensjon,
    sumLonnstilskuddPerManed,
    sumUtgifter,
    visSatsMedEttDesimal,
    visTalletEller0,
} from './lonnstilskuddUtregningUtils';

const MÅNEDSLØNN = 10000;
const FERIEPENGE_SATS = 0.12;
const ARBEIDSGIVERAVGIFT_SATS = 0.141;
const STILLINGSPROSENT = 50;
const LØNNSTILSKUDD_PROSENT = 40;

const feriepengene = feriepenger(MÅNEDSLØNN, FERIEPENGE_SATS);
const obligTjenestepensjonen = obligTjenestepensjon(MÅNEDSLØNN, feriepengene);
const lonnFeriePensjon = sumLonnFeriePensjon(MÅNEDSLØNN, feriepengene, obligTjenestepensjonen);
const arbeidsgiveravgiften = arbeidsgiveravgift(lonnFeriePensjon, ARBEIDSGIVERAVGIFT_SATS);
const sumUtgiftene = sumUtgifter(MÅNEDSLØNN, feriepengene, obligTjenestepensjonen, arbeidsgiveravgiften);

test('Feriepenger', () => {
    expect(feriepenger(MÅNEDSLØNN, FERIEPENGE_SATS)).toBe(1200);
});

test('Obligatorisk Tjenestepensjon', () => {
    expect(obligTjenestepensjon(MÅNEDSLØNN, feriepengene)).toBe(224);
});

test('Sum Lønn, Ferie og Pensjon', () => {
    expect(lonnFeriePensjon).toBe(11424);
});

test('Arbeidsgiveravgift', () => {
    expect(arbeidsgiveravgiften).toBe(1611);
});

test('Sum utgifter', () => {
    expect(sumUtgiftene).toBe(13035);
});

test('Lønn ved 100% stilling', () => {
    expect(lonnHundreProsent(sumUtgiftene, STILLINGSPROSENT)).toBe(26070);
});

test('Sum lønnstilskudd per måned', () => {
    expect(sumLonnstilskuddPerManed(sumUtgiftene, LØNNSTILSKUDD_PROSENT)).toBe(5214);
});

test('visTalltEller0', () => {
    expect(visTalletEller0(1000)).toBe(1000);
    expect(visTalletEller0()).toBe(0);
    expect(visTalletEller0(undefined)).toBe(0);
    expect(visTalletEller0(NaN)).toBe(0);
});
test('visSatsMedEttDesmial', () => {
    // .toFixed() som brukes for å spesifisere antall desimaler returnerer string.
    expect(visSatsMedEttDesimal(0.141)).toBe('14.1');
    expect(visSatsMedEttDesimal(0.12)).toBe('12.0');
    expect(visSatsMedEttDesimal()).toBe('0.0');
    expect(visSatsMedEttDesimal(undefined)).toBe('0.0');
    expect(visSatsMedEttDesimal(NaN)).toBe('0.0');
});

// Sjekker med blanke verdier
test('Sum utgifter uten arbeidsgiveravgift skal fortsatt regnes ut', () => {
    const sumUtgifteneArbeidsgiveravgift0 = sumUtgifter(MÅNEDSLØNN, feriepengene, obligTjenestepensjonen, 0);
    expect(sumUtgifteneArbeidsgiveravgift0).toBe(11424);
});

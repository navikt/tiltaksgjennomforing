import {
    arbeidsgiveravgift,
    feriepenger,
    lonnHundreProsent,
    obligTjenestepensjon,
    sumLonnFeriePensjon,
    sumLonnstilskuddPerManed,
    sumUtgifter,
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

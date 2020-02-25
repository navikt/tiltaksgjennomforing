import {
    arbeidsgiveravgift,
    feriepenger,
    obligTjenestepensjon,
    sumLonnFeriePensjon,
} from './lonnstilskuddUtregningUtils';

const MÅNEDSLØNN = 10000;
const FERIEPENGE_SATS = 12;
const ARBEIDSGIVERAVGIFT_SATS = 14.1;

const feriepengene = feriepenger(MÅNEDSLØNN, FERIEPENGE_SATS);
const obligTjenestepensjonen = obligTjenestepensjon(MÅNEDSLØNN, feriepengene);
const lonnFeriePensjon = sumLonnFeriePensjon(MÅNEDSLØNN, feriepengene, obligTjenestepensjonen);
const arbeidsgiveravgiften = arbeidsgiveravgift(lonnFeriePensjon, ARBEIDSGIVERAVGIFT_SATS);

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

test('Sum utgifter (månedslønn, feriepenger, otp, arbavgift)', () => {
    // Tilsvarende i Altinn: "Månedslønn inkl. feriepenger, arbeidsgiveravgift og obligatorisk tjenestepensjon"
});

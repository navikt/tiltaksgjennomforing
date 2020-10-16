import { lonnHundreProsent } from './lonnstilskuddUtregningUtils';

test('Lønn ved 100% stilling', () => {
    const STILLINGSPROSENT = 50;
    const SUM_UTGIFTER = 15000;
    expect(lonnHundreProsent(SUM_UTGIFTER, STILLINGSPROSENT)).toBe(30000);
});

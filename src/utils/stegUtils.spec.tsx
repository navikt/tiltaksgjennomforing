import hentAvtaleSteg, { avtaleTittel } from './stegUtils';

test('test riktig antall steg for arbeidstrening', () => {
    const avtaleSteg = hentAvtaleSteg.ARBEIDSTRENING;
    expect(avtaleSteg).toHaveLength(6);
});

test('test riktig antall steg for varig lønnstilskudd', () => {
    const avtaleStegLtsVarig = hentAvtaleSteg.VARIG_LONNSTILSKUDD;
    expect(avtaleStegLtsVarig).toHaveLength(6);
});

test('test riktig antall steg for midlertidig lønnstilskudd', () => {
    const avtaleStegLtsMidlertidig = hentAvtaleSteg.MIDLERTIDIG_LONNSTILSKUDD;
    expect(avtaleStegLtsMidlertidig).toHaveLength(6);
});

test('skal returnere riktig tittel for arbeidstrening ', () => {
    const arbeidstrening = avtaleTittel.ARBEIDSTRENING;
    expect(arbeidstrening).toEqual('arbeidstrening');
});
test('skal returnere riktig tittel midlertidig lønnstilskudd ', () => {
    const lonnstilskuddMidlertidig = avtaleTittel.MIDLERTIDIG_LONNSTILSKUDD;
    expect(lonnstilskuddMidlertidig).toEqual('midlertidig lønnstilskudd');
});
test('skal returnere riktig tittel for varig lønnstilskudd ', () => {
    const lonnstilskuddVarig = avtaleTittel.VARIG_LONNSTILSKUDD;
    expect(lonnstilskuddVarig).toEqual('varig lønnstilskudd');
});

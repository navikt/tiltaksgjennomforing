import hentAvtaleSteg from './hentAvtaleSteg';

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

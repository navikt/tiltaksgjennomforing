import hentAvtaleSteg from './stegUtils';

test('test riktig antall steg for arbeidstrening', () => {
    const avtaleSteg = hentAvtaleSteg.ARBEIDSTRENING;
    expect(avtaleSteg).toHaveLength(6);
});

test('test riktig antall steg for lønnstilskudd', () => {
    const avtaleStegLtsMidlertidig = hentAvtaleSteg.MIDLERTIDIG_LONNSTILSKUDD;
    const avtaleStegLtsVarig = hentAvtaleSteg.VARIG_LONNSTILSKUDD;
    expect(avtaleStegLtsMidlertidig && avtaleStegLtsVarig).toHaveLength(6);
});

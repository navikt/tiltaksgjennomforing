import { Maalkategori, maalkategorier } from '../maalkategorier';

export const finnLedigeMaalkategorier = (
    brukteKategorier: Maalkategori[]
): Maalkategori[] => {
    return maalkategorier.filter(
        kategori => kategori === 'Annet' || !brukteKategorier.includes(kategori)
    );
};

export const setFritekstMaksTusenTegn = (tekst: string) => {
    if (tekst.length < 1000) {
        return tekst;
    } else {
        return null;
    }
};

import { Maalkategori, maalkategorier } from '../maalkategorier';

export const finnLedigeMaalkategorier = (
    brukteKategorier: Maalkategori[]
): Maalkategori[] => {
    return maalkategorier.filter(
        kategori => kategori === 'Annet' || !brukteKategorier.includes(kategori)
    );
};

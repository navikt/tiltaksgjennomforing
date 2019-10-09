import { Maalkategori, maalkategorier } from '@/types/maalkategorier';

export const finnLedigeMaalkategorier = (
    brukteKategorier: Maalkategori[]
): Maalkategori[] => {
    return maalkategorier.filter(
        kategori => kategori === 'Annet' || !brukteKategorier.includes(kategori)
    );
};

import { Maalkategori, maalkategorier } from '@/types/maalkategorier';
import { Maal } from '@/types/avtale';

export const finnLedigeMaalkategorier = (brukteKategorier: Maal[]): Maalkategori[] => {
    const valgteMaalkategorier = (): Maalkategori[] => {
        return brukteKategorier.map(maal => maal.kategori);
    };

    return maalkategorier.filter(kategori => kategori === 'ANNET' || !valgteMaalkategorier().includes(kategori));
};

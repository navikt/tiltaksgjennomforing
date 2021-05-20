import { finnLedigeMaalkategorier } from '@/AvtaleSide/steg/MaalSteg/maal-utils';
import { Maal } from '@/types/avtale';
import { Maalkategori } from '@/types/maalkategorier';
import { useState } from 'react';

export const useMål = (initiellMålListe: Maal[]) => {
    const [målListe, setMålListe] = useState<Maal[]>(initiellMålListe);

    const leggTilMål = (beskrivelse: string, kategori: Maalkategori) => {
        const nyMålListe = [...målListe];
        nyMålListe.push({ beskrivelse, kategori });
        setMålListe(nyMålListe);
    };

    const endreMål = (id: string, beskrivelse: string, kategori: Maalkategori) => {
        const nyMålListe = [...målListe];
        const index = nyMålListe.findIndex(mål => mål.id === id);
        nyMålListe[index] = {
            id: id,
            beskrivelse: beskrivelse,
            kategori: kategori,
        };
        setMålListe(nyMålListe);
    };

    const ledigeMålkategorier = finnLedigeMaalkategorier(målListe);

    const sletteMål = (id: string) => {
        const nyMålListe = målListe.filter(m => m.id !== id);
        setMålListe(nyMålListe);
    };

    return { målListe, ledigeMålkategorier, leggTilMål, endreMål, sletteMål };
};

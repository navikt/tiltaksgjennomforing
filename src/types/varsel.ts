import { HendelseType } from '@/types/hendelse';
import { Rolle } from '@/types/innlogget-bruker';

export interface Varsel {
    id: string;
    lest: boolean;
    tekst: string;
    hendelseType: HendelseType;
    bjelle: boolean;
    avtaleId: string;
    tidspunkt: string;
    utførtAv: Rolle;
}

import { HendelseType } from '@/types/hendelse';
import { Rolle } from '@/types/innlogget-bruker';

export interface Varsel {
    id: string;
    lest: boolean;
    tekst: string;
    avtaleId: string;
    tidspunkt: string;
    hendelseType: HendelseType;
    bjelle: boolean;
    mottaker: Rolle;
    utførtAv: Rolle;
}

import { HendelseType } from '@/types/hendelse';
import { Moment } from 'moment';
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

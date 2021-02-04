import { HendelseType } from '@/types/hendelse';
import { Moment } from 'moment';
import { Rolle } from '@/types/innlogget-bruker';

export type VarselStatus = 'VARSEL' | 'LOGG';

export interface Varsel {
    id: string;
    lest: boolean;
    varslingstekst: string;
    avtaleId: string;
    tidspunkt: string;
    varslbarHendelseType: HendelseType;
    varslbarStatus: VarselStatus;
    mottaker: Rolle;
    utførtAv: Rolle;
}

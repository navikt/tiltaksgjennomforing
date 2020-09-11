import { HendelseType } from '@/types/hendelse';
import { Moment } from 'moment';

export default interface Varsel {
    id: string;
    lest: boolean;
    varslingstekst: string;
    avtaleId: string;
    tidspunkt: Moment;
    varslbarHendelseType: HendelseType;
}

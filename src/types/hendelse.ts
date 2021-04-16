import { Rolle } from './innlogget-bruker';

export type Hendelse = {
    id: string;
    tidspunkt: string;
    utførtAv: Rolle;
    hendelse: HendelseType;
};

export type HendelseType =
    | 'OPPRETTET'
    | 'GODKJENT_AV_ARBEIDSGIVER'
    | 'GODKJENT_AV_VEILEDER'
    | 'GODKJENT_AV_DELTAKER'
    | 'GODKJENT_PAA_VEGNE_AV'
    | 'GODKJENNINGER_OPPHEVET_AV_ARBEIDSGIVER'
    | 'GODKJENNINGER_OPPHEVET_AV_VEILEDER'
    | 'SMS_VARSLING_FEILET'
    | 'ENDRET'
    | 'DELT_MED_DELTAKER'
    | 'DELT_MED_ARBEIDSGIVER'
    | 'ANNULLERT'
    | 'AVBRUTT'
    | 'GJENOPPRETTET'
    | 'OPPRETTET_AV_ARBEIDSGIVER'
    | 'LÅST_OPP'
    | 'NY_VEILEDER'
    | 'AVTALE_FORDELT'
    | 'TILSKUDDSPERIODE_AVSLATT'
    | 'TILSKUDDSPERIODE_GODKJENT'
    | 'AVTALE_FORLENGET'
    | 'TILSKUDDSBEREGNING_ENDRET';

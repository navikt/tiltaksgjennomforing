import * as moment from 'moment';
import { Maalkategori } from './maalkategorier';

export type Avtale = AvtaleMetadata &
    Deltakerinfo &
    Bedriftinfo &
    Arbeidsgiverinfo &
    Veilederinfo &
    Arbeidstid &
    Maalsetninger &
    Bekreftelser;

export interface AvtaleMetadata {
    id: string;
    opprettetTidspunkt: string;
}

export interface Deltakerinfo {
    deltakerFornavn: string;
    deltakerEtternavn: string;
    deltakerAdresse: string;
    deltakerPostnummer: string;
    deltakerPoststed: string;
}

export interface Bedriftinfo {
    bedriftNavn: string;
    bedriftAdresse: string;
    bedriftPostnummer: string;
    bedriftPoststed: string;
}

export interface Arbeidsgiverinfo {
    arbeidsgiverFornavn: string;
    arbeidsgiverEtternavn: string;
    arbeidsgiverEpost: string;
    arbeidsgiverTlf: string;
}

export interface Veilederinfo {
    veilederFornavn: string;
    veilederEtternavn: string;
    veilederEpost: string;
    veilederTlf: string;
}

export interface Arbeidstid {
    startDatoTimestamp: number;
    sluttDatoTimestamp: number;
}

export interface Maalsetninger {
    maalsetninger: Maalsetning[];
}

export interface Maalsetning {
    kategori: Maalkategori;
    beskrivelse: string;
}

export interface Bekreftelser {
    bekreftetAvBruker: boolean;
    bekreftetAvArbeidsgiver: boolean;
    bekreftetAvVeileder: boolean;
}

export const tomAvtale: Avtale = {
    id: '',
    opprettetTidspunkt: '',

    deltakerFornavn: '',
    deltakerEtternavn: '',
    deltakerAdresse: '',
    deltakerPostnummer: '',
    deltakerPoststed: '',

    bedriftNavn: '',
    bedriftAdresse: '',
    bedriftPostnummer: '',
    bedriftPoststed: '',

    arbeidsgiverFornavn: '',
    arbeidsgiverEtternavn: '',
    arbeidsgiverEpost: '',
    arbeidsgiverTlf: '',

    veilederFornavn: '',
    veilederEtternavn: '',
    veilederEpost: '',
    veilederTlf: '',

    startDatoTimestamp: moment().valueOf(),
    sluttDatoTimestamp: moment().valueOf(),
    maalsetninger: [],

    bekreftetAvBruker: false,
    bekreftetAvArbeidsgiver: false,
    bekreftetAvVeileder: false,
};

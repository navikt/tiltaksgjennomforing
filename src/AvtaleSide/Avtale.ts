import * as moment from 'moment';

export type Avtale = AvtaleMetadata &
    Deltakerinfo &
    Bedriftinfo &
    Arbeidsgiverinfo &
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

// export interface Veilederinfo { }

export interface Arbeidstid {
    startDatoTimestamp: number;
    sluttDatoTimestamp: number;
}

export interface Maalsetninger {
    // TODO: Endre navn til Maalsetning
    malsetninger: Malsetning[];
}

// TODO: Flytt ut i egen fil
export type Malkategori =
    | 'Avklaring'
    | 'Arbeidserfaring'
    | 'Oppnå fagbrev/kompetansebevis'
    | 'Språkopplæring'
    | 'Få jobb på arbeidstreningsplass';

// TODO: Flytt ut i egen fil
export interface Malsetning {
    kategori: Malkategori;
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

    startDatoTimestamp: moment().valueOf(),
    sluttDatoTimestamp: moment().valueOf(),
    malsetninger: [],

    bekreftetAvBruker: false,
    bekreftetAvArbeidsgiver: false,
    bekreftetAvVeileder: false,
};

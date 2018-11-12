import * as moment from 'moment';

export type Avtale = AvtaleMetadata &
    Deltakerinfo &
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

export interface Arbeidsgiverinfo {
    arbeidsgiverorgnr: string;
    arbeidsgivernavn: string;
    arbeidsgivertlf: string;
    arbeidsgiverkontaktperson: string;
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

    arbeidsgiverorgnr: '',
    arbeidsgivernavn: '',
    arbeidsgivertlf: '',
    arbeidsgiverkontaktperson: '',

    startDatoTimestamp: moment().valueOf(),
    sluttDatoTimestamp: moment().valueOf(),
    malsetninger: [],

    bekreftetAvBruker: false,
    bekreftetAvArbeidsgiver: false,
    bekreftetAvVeileder: false,
};

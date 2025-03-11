export enum Diskresjonskode {
    STRENGT_FORTROLIG_UTLAND = 'STRENGT_FORTROLIG_UTLAND',
    STRENGT_FORTROLIG = 'STRENGT_FORTROLIG',
    FORTROLIG = 'FORTROLIG',
    UGRADERT = 'UGRADERT',
}

export interface Aktsomhet {
    kreverAktsomhet: boolean;
    diskresjonskode?: Diskresjonskode;
}

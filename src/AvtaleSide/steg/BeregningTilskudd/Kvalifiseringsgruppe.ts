export enum Kvalifiseringsgruppe {
    SPESIELT_TILPASSET_INNSATS = 'BATT', // Personen har nedsatt arbeidsevne og har et identifisert behov.
    SITUASJONSBESTEMT_INNSATS = 'BFORM', // Personen har moderat bistandsbehov
    VARIG_TILPASSET_INNSATS = 'VARIG', // Personen har varig nedsatt arbeidsevne
    BEHOV_FOR_ARBEIDSEVNEVURDERING = 'BKART', // Personen har behov for arbeidsevnevurdering
    STANDARD_INNSATS = 'IKVAL', // Personen har behov for ordinær bistand
    IKKE_VURDERT = 'IVURD', // Ikke vurdert
    RETTIGHETER_ETTER_FTRL_KAP11 = 'KAP11', // Rettigheter etter Ftrl. Kapittel 11
    HELSERELATERT_ARBEIDSRETTET_OPPFOLGING_I_NAV = 'OPPFI', // Helserelatert arbeidsrettet oppfølging i NAV
    SYKMELDT_OPPFOLGING_PA_ARBEIDSPLASSEN = 'VURDI', // Sykmeldt, oppfølging på arbeidsplassen
    SYKMELDT_UTEN_ARBEIDSGIVER = 'VURDU', // Sykmeldt uten arbeidsgiver
}

const erGyldingKvalifiseringForMidlertidiglonnstilskudd = (kode: string): boolean => {
    return (
        kode === Kvalifiseringsgruppe.SPESIELT_TILPASSET_INNSATS ||
        kode === Kvalifiseringsgruppe.SITUASJONSBESTEMT_INNSATS ||
        kode === Kvalifiseringsgruppe.VARIG_TILPASSET_INNSATS
    );
};

const erGyldingKvalifiseringForVariglonntilskudd = (kode: string): boolean =>
    kode === Kvalifiseringsgruppe.VARIG_TILPASSET_INNSATS;

const hentFeilMeldingForUgyldingKvalifiseringsgruppe = (kode: string): string => {
    return 'Kandidat er registrert med status '
        .concat(hentKvalifiseringsgruppeTekst(kode))
        .concat('. Denne gruppen kvalifiserer ikke til Arbeidstiltaket.');
};

const hentKvalifiseringsgruppeTekst = (kode: string): string => {
    switch (kode) {
        case Kvalifiseringsgruppe.BEHOV_FOR_ARBEIDSEVNEVURDERING:
            return 'behov for arbeidsevnevurdering';
        case Kvalifiseringsgruppe.STANDARD_INNSATS:
            return 'standard innsats';
        case Kvalifiseringsgruppe.IKKE_VURDERT:
            return 'ikke vurdert';
        case Kvalifiseringsgruppe.RETTIGHETER_ETTER_FTRL_KAP11:
            return 'rettigheter etter Ftrl, kapittel 11';
        case Kvalifiseringsgruppe.HELSERELATERT_ARBEIDSRETTET_OPPFOLGING_I_NAV:
            return 'helserelatert arbeidsrettet oppfølging';
        case Kvalifiseringsgruppe.SYKMELDT_OPPFOLGING_PA_ARBEIDSPLASSEN:
            return 'sykmeldt, oppfølging på arbeidsplassen';
        case Kvalifiseringsgruppe.SYKMELDT_UTEN_ARBEIDSGIVER:
            return 'sykmeldt uten arbeidsgiver';
        default:
            return 'Ikke funnet';
    }
};

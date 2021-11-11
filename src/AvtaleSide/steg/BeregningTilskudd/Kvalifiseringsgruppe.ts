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

import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

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

export const sjekkKvalifiseringsgruppeOppMotTiltakstype = (tiltakstype: string, kvalifiseringsgruppe: string) => {
    if (
        (tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD' &&
            !erGyldingKvalifiseringForMidlertidiglonnstilskudd(kvalifiseringsgruppe)) ||
        (tiltakstype === 'VARIG_LONNSTILSKUDD' && !erGyldingKvalifiseringForVariglonntilskudd(kvalifiseringsgruppe))
    ) {
        return (
            <AlertStripeAdvarsel>
                <div style={{ marginBottom: '0.5rem' }}>
                    {hentFeilMeldingForUgyldingKvalifiseringsgruppe(kvalifiseringsgruppe)}
                </div>
                {hentListeMedGyldigeGrupperForTiltak(tiltakstype)}
            </AlertStripeAdvarsel>
        );
    }
    return null;
};

const erGyldingKvalifiseringForMidlertidiglonnstilskudd = (kode: string): boolean => {
    return (
        kode === Kvalifiseringsgruppe.SPESIELT_TILPASSET_INNSATS ||
        kode === Kvalifiseringsgruppe.SITUASJONSBESTEMT_INNSATS ||
        kode === Kvalifiseringsgruppe.VARIG_TILPASSET_INNSATS
    );
};

const erGyldingKvalifiseringForVariglonntilskudd = (kode: string): boolean =>
    kode === Kvalifiseringsgruppe.VARIG_TILPASSET_INNSATS;

const hentFeilMeldingForUgyldingKvalifiseringsgruppe = (kode: string): React.ReactNode => {
    const tekst = hentKvalifiseringsgruppeTekst(kode);
    if (tekst) {
        return (
            <>
                Kandidat er registrert med servicegruppe
                <em>{' ' + tekst + '. '}</em>
                Denne gruppen kvalifiserer ikke til dette tiltaket.
                Sjekk at innsatsbehovet stemmer.
                Hvis det stemmer så gi beskjed til arbeidsgiver og annuller avtale.
            </>
        );
    }
    return <>Det er ikke registrert noen kvalifiseringsgruppe/servicegruppe på kandidat.</>;
};

const hentListeMedGyldigeGrupperForTiltak = (tiltakstype: string) => {
    if (tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD') {
        return genererGyldigListeMedlemmer(
            [
                Kvalifiseringsgruppe.SPESIELT_TILPASSET_INNSATS,
                Kvalifiseringsgruppe.SITUASJONSBESTEMT_INNSATS,
                Kvalifiseringsgruppe.VARIG_TILPASSET_INNSATS,
            ],
            'Kvalifiseringsgruppe/Servicegruppe',
            hentKvalifiseringsgruppeTekst
        );
    } else if (tiltakstype === 'VARIG_LONNSTILSKUDD') {
        return genererGyldigListeMedlemmer(
            [Kvalifiseringsgruppe.VARIG_TILPASSET_INNSATS],
            'Kvalifiseringsgruppe/Servicegruppe',
            hentKvalifiseringsgruppeTekst
        );
    }
    return null;
};

export const genererGyldigListeMedlemmer = (
    medlemsliste: string[],
    gruppeTypeTekst: string,
    callbackHenttekst: (key: string) => string
): React.ReactNode => (
    <>
        {gruppeTypeTekst} tillatt:
        <ul>
            {medlemsliste.map((type, index) => (
                <li key={index}>{callbackHenttekst(type)}</li>
            ))}
        </ul>
    </>
);

export const hentKvalifiseringsgruppeTekst = (kode: string = ''): string => {
    switch (kode) {
        case Kvalifiseringsgruppe.SPESIELT_TILPASSET_INNSATS:
            return 'spesielt tilpasset innsats';
        case Kvalifiseringsgruppe.SITUASJONSBESTEMT_INNSATS:
            return 'situasjonsbestemt innsats';
        case Kvalifiseringsgruppe.VARIG_TILPASSET_INNSATS:
            return 'varig tilpasset innsats';
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
            return '';
    }
};

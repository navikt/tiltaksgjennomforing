export enum Formidlingsgruppe {
    ARBEIDSSOKER = 'ARBS', // Person er tilgjengelig for alt søk etter   arbeidskraft, ordinær og vikar
    IKKE_ARBEIDSSOKER = 'IARBS', // Person er ikke tilgjengelig for søk etter arbeidskraft
    INAKTIVERT_JOBBSKIFTER = 'IJOBS', // Jobbskifter som er inaktivert fra nav.no
    IKKE_SERVICEBEHOV = 'ISERV', // Inaktivering, person mottar ikke bistand fra NAV
    FRA_NAV_NO = 'JOBBS', // Personen er ikke tilgjengelig for søk
    PRE_ARBEIDSSOKER = 'PARBS', // Personen fra nav.no som ønsker å bli arbeidssøker, men som enda ikke er   verifisert
    PRE_REAKTIVERT_ARBEIDSSOKER = 'RARBS', // Person som er reaktivert fra nav.no
}

export const hentFormidlingsgruppeTekst = (formidlingskode: string = '') => {
    switch (formidlingskode) {
        case Formidlingsgruppe.ARBEIDSSOKER:
            return 'arbeidssøker';
        case Formidlingsgruppe.FRA_NAV_NO:
            return 'fra nav no';
        case Formidlingsgruppe.PRE_ARBEIDSSOKER:
            return 'pre-arbeidssøker';
        case Formidlingsgruppe.PRE_REAKTIVERT_ARBEIDSSOKER:
            return 'pre-reaktivert-arbeidssøker';
        case Formidlingsgruppe.IKKE_ARBEIDSSOKER:
            return 'ikke arbeidssøker';
        case Formidlingsgruppe.INAKTIVERT_JOBBSKIFTER:
            return 'inaktivert jobbskifter';
        case Formidlingsgruppe.IKKE_SERVICEBEHOV:
            return 'ikke servicebehov';
        default:
            return '';
    }
};

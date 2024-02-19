import { genererGyldigListeMedlemmer } from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';
import { Alert } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

export enum Formidlingsgruppe {
    ARBEIDSSOKER = 'ARBS', // Person er tilgjengelig for alt søk etter   arbeidskraft, ordinær og vikar
    IKKE_ARBEIDSSOKER = 'IARBS', // Person er ikke tilgjengelig for søk etter arbeidskraft
    INAKTIVERT_JOBBSKIFTER = 'IJOBS', // Jobbskifter som er inaktivert fra nav.no
    IKKE_SERVICEBEHOV = 'ISERV', // Inaktivering, person mottar ikke bistand fra NAV
    FRA_NAV_NO = 'JOBBS', // Personen er ikke tilgjengelig for søk
    PRE_ARBEIDSSOKER = 'PARBS', // Personen fra nav.no som ønsker å bli arbeidssøker, men som enda ikke er   verifisert
    PRE_REAKTIVERT_ARBEIDSSOKER = 'RARBS', // Person som er reaktivert fra nav.no
}

const ugyldigFormidlingsgruppe = (formidlingsgruppe: Formidlingsgruppe): boolean => {
    switch (formidlingsgruppe) {
        case Formidlingsgruppe.ARBEIDSSOKER:
        case Formidlingsgruppe.FRA_NAV_NO:
        case Formidlingsgruppe.PRE_ARBEIDSSOKER:
        case Formidlingsgruppe.PRE_REAKTIVERT_ARBEIDSSOKER:
            return false;
        case Formidlingsgruppe.IKKE_ARBEIDSSOKER:
        case Formidlingsgruppe.INAKTIVERT_JOBBSKIFTER:
        case Formidlingsgruppe.IKKE_SERVICEBEHOV:
        default:
            return true;
    }
};

interface Props {
    formidlingsgruppe: Formidlingsgruppe;
}

export const SjekkOmGyldigFormidlingsgruppe: FunctionComponent<Props> = (props) => {
    const { formidlingsgruppe } = props;
    if (ugyldigFormidlingsgruppe(formidlingsgruppe)) {
        return (
            <Alert variant="warning">
                <div style={{ marginBottom: '0.5rem' }}>
                    {hentFeilMeldingForUgyldigFormidlingsgruppe(formidlingsgruppe)}
                </div>
                {genererGyldigListeMedlemmer(
                    [
                        Formidlingsgruppe.IKKE_ARBEIDSSOKER,
                        Formidlingsgruppe.INAKTIVERT_JOBBSKIFTER,
                        Formidlingsgruppe.IKKE_SERVICEBEHOV,
                    ],
                    'Formidlingsgruppe',
                    hentFormidlingsgruppeTekst,
                )}
            </Alert>
        );
    }
    return null;
};

const hentFeilMeldingForUgyldigFormidlingsgruppe = (formidlingskode: string): React.ReactNode => {
    const tekst = hentFormidlingsgruppeTekst(formidlingskode);
    if (tekst) {
        return (
            <>
                Kandidat er registrert med formidlingsgruppe
                <em>{' ' + tekst + '. '}</em>
                Denne gruppen kvalifiserer ikke til Arbeidstiltaket.
            </>
        );
    }
    return <>Det er ikke registrert noen formidlingsgruppe på kandidat.</>;
};

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

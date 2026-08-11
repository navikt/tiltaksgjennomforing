export enum Innsatsgruppe {
    GODE_MULIGHETER = 'GODE_MULIGHETER',
    TRENGER_VEILEDNING = 'TRENGER_VEILEDNING',
    TRENGER_VEILEDNING_NEDSATT_ARBEIDSEVNE = 'TRENGER_VEILEDNING_NEDSATT_ARBEIDSEVNE',
    JOBBE_DELVIS = 'JOBBE_DELVIS',
    LITEN_MULIGHET_TIL_A_JOBBE = 'LITEN_MULIGHET_TIL_A_JOBBE',
    UKJENT = 'UKJENT',
}

export const innsatsgruppeTekst: Record<Innsatsgruppe, string> = {
    GODE_MULIGHETER: 'Gode muligheter',
    TRENGER_VEILEDNING: 'Trenger veiledning',
    TRENGER_VEILEDNING_NEDSATT_ARBEIDSEVNE: 'Trenger veiledning, nedsatt arbeidsevne',
    JOBBE_DELVIS: 'Jobbe delvis',
    LITEN_MULIGHET_TIL_A_JOBBE: 'Liten mulighet til å jobbe',
    UKJENT: 'Ikke satt',
};

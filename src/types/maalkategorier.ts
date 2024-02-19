export const maalkategorier = [
    'FÅ_JOBB_I_BEDRIFTEN',
    'ARBEIDSERFARING',
    'UTPRØVING',
    'SPRÅKOPPLÆRING',
    'OPPNÅ_FAGBREV_KOMPETANSEBEVIS',
    'ANNET',
] as const;

export type Maalkategori = (typeof maalkategorier)[number];

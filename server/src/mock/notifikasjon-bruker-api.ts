export function notifikasjonsRespons() {
    const now = new Date();

    return {
        data: {
            notifikasjoner: {
                feilAltinn: false,
                feilDigiSyfo: false,
                notifikasjoner: [
                    {
                        __typename: 'Beskjed',
                        brukerKlikk: {
                            id: '16120101181-69b474d1-0274-4928-aa76-87128f1fa462',
                            klikketPaa: false,
                            __typename: 'BrukerKlikk',
                        },
                        virksomhet: {
                            navn: 'MAURA OG KOLBU REGNSKAP',
                            virksomhetsnummer: '910825518',
                            __typename: 'Virksomhet',
                        },
                        lenke: '/tiltaksgjennomforing/avtale/',
                        tekst: 'Avtale om Midlertidig lønnstilskudd godkjent.',
                        merkelapp: 'Lønnstilskudd',
                        opprettetTidspunkt: now.toISOString(),
                        sorteringTidspunkt: now.toISOString(),
                        id: '69b474d1-0274-4928-aa76-87128f1fa462',
                        sak: {
                            tittel: 'Avtale om Midlertidig lønnstilskudd for Usymmetrisk Skogmarihand',
                            __typename: 'SakMetadata',
                        },
                    },
                    {
                        __typename: 'Oppgave',
                        brukerKlikk: {
                            id: '16120101181-c85c94b6-ba0f-4879-8984-021e2bdc2c33',
                            klikketPaa: false,
                            __typename: 'BrukerKlikk',
                        },
                        virksomhet: {
                            navn: 'MAURA OG KOLBU REGNSKAP',
                            virksomhetsnummer: '910825518',
                            __typename: 'Virksomhet',
                        },
                        lenke: '/tiltaksgjennomforing/avtale/',
                        tekst: 'Ny avtale om Midlertidig lønnstilskudd opprettet. Åpne avtalen og fyll ut innholdet.',
                        merkelapp: 'Lønnstilskudd',
                        opprettetTidspunkt: now.toISOString(),
                        sorteringTidspunkt: now.toISOString(),
                        paaminnelseTidspunkt: null,
                        utgaattTidspunkt: null,
                        utfoertTidspunkt: now.toISOString(),
                        tilstand: 'UTFOERT',
                        id: 'c85c94b6-ba0f-4879-8984-021e2bdc2c33',
                        frist: null,
                        sak: {
                            tittel: 'Avtale om Midlertidig lønnstilskudd for Usymmetrisk Skogmarihand',
                            __typename: 'SakMetadata',
                        },
                    },
                ],
                __typename: 'NotifikasjonerResultat',
            },
        },
    };
}

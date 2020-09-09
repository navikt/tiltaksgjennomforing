import { Avtale, LonnstilskuddAvtaleinnhold } from '@/types/avtale';

const lonnstilskuddAvtaleMock: Avtale<LonnstilskuddAvtaleinnhold> = {
    id: '1',
    opprettetTidspunkt: '2020-01-02T00:00:00.000000',
    sistEndret: '2020-01-03T00:00:00.000000',

    godkjentAvDeltaker: false,
    godkjentAvArbeidsgiver: false,
    godkjentAvVeileder: false,
    erLaast: false,
    status: 'Påbegynt',
    kanAvbrytes: true,
    kanLåsesOpp: false,
    kanGjenopprettes: false,
    versjoner: [],
    avbrutt: false,
    godkjentPaVegneAv: false,

    godkjentPaVegneGrunn: {
        ikkeBankId: false,
        reservert: false,
        digitalKompetanse: false,
    },

    oppfolging: 'Bruker og AG skal følges opp.',
    tilrettelegging: 'AG skal tilrettelegge.',

    startDato: '2020-04-01',
    sluttDato: '2020-05-01',
    stillingprosent: 99,

    veilederNavIdent: 'Z123456',
    veilederFornavn: 'Kåre',
    veilederEtternavn: 'Sandøy',
    veilederTlf: '88888888',

    bedriftNavn: 'Arna Snekker AS',
    bedriftNr: '12345678',

    deltakerFornavn: 'Håkon',
    deltakerEtternavn: 'Johansen',
    deltakerFnr: '00000000000',
    deltakerTlf: '54444444',

    arbeidsgiverFornavn: 'Ingunn',
    arbeidsgiverEtternavn: 'Thomassen',
    arbeidsgiverTlf: '87777777',
    tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',

    arbeidsgiveravgift: 20,
    feriepengesats: 20,
    lonnstilskuddProsent: 60,
    manedslonn: 10000,
    arbeidsgiverKontonummer: '123',
    arbeidsoppgaver: '',
    stillingstittel: '',
    harFamilietilknytning: false,
    avbruttDato: '',
    avbruttGrunn: '',
};

export default lonnstilskuddAvtaleMock;

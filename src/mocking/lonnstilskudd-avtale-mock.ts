import { LonnstilskuddAvtaleinnhold, Avtale } from '@/types/avtale';

const lonnstilskuddAvtaleMock: Avtale<LonnstilskuddAvtaleinnhold> = {
    id: '9565e74d-66f3-44a1-8a3c-91fae6b450d3',
    opprettetTidspunkt: '',
    sistEndret: '',

    godkjentAvDeltaker: false,
    godkjentAvArbeidsgiver: false,
    godkjentAvVeileder: false,
    erLaast: false,
    status: '',
    kanAvbrytes: true,
    kanLaasesOpp: false,
    versjon: 1,
    versjoner: [],
    avbrutt: false,
    godkjentPaVegneAv: false,

    godkjentPaVegneGrunn: {
        ikkeBankId: false,
        reservert: false,
        digitalKompetanse: false,
    },

    oppfolging: 'Bruker og AG skal følges opp',
    tilrettelegging: 'AG skal tilrettelegge',

    startDato: 99,
    sluttDato: 99,
    stillingprosent: 99,

    veilederNavIdent: 'Z123456',
    veilederFornavn: 'Nav',
    veilederEtternavn: 'Navesen',
    veilederTlf: '88888888',

    bedriftNavn: 'Arbeid AS',
    bedriftNr: '12345678',

    deltakerFornavn: 'Deltaker',
    deltakerEtternavn: 'Deltakersen',
    deltakerFnr: '00000000000',
    deltakerTlf: '44444444',

    arbeidsgiverFornavn: 'Arbeidsgiver',
    arbeidsgiverEtternavn: 'Arbeidsgiversen',
    arbeidsgiverTlf: '77777777',
    tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',

    arbeidsgiveravgift: 10,
    feriepengesats: 10,
    lonnstilskuddProsent: '60',
    manedslonn: 10000,
    arbeidsgiverKontonummer: '123',
    stillingbeskrivelse: '',
    stillingtype: '',
};

export default lonnstilskuddAvtaleMock;

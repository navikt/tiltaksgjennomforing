import { LonnstilskuddAvtaleinnhold, Avtale } from '@/types/avtale';

const lonnstilskuddAvtaleMock: Avtale<LonnstilskuddAvtaleinnhold> = {
    id: '6565e74d-66f3-44a1-8a3c-91fae6b450d3',
    opprettetTidspunkt: '',
    sistEndret: '',

    godkjentAvDeltaker: false,
    godkjentAvArbeidsgiver: false,
    godkjentAvVeileder: false,
    erLaast: false,
    status: '',
    kanAvbrytes: true,
    kanLåsesOpp: false,
    versjon: 1,
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

    startDato: 89,
    sluttDato: 79,
    stillingprosent: 99,

    veilederNavIdent: 'Z123456',
    veilederFornavn: 'Nave',
    veilederEtternavn: 'Naversen',
    veilederTlf: '88888888',

    bedriftNavn: 'Arbeids AS',
    bedriftNr: '12345678',

    deltakerFornavn: 'Deltakeren',
    deltakerEtternavn: 'Deltakerensen',
    deltakerFnr: '00000000000',
    deltakerTlf: '54444444',

    arbeidsgiverFornavn: 'Arbeidsgivers',
    arbeidsgiverEtternavn: 'Arbeidsgiverssen',
    arbeidsgiverTlf: '87777777',
    tiltakstype: 'MIDLERTIDIG_LONNSTILSKUDD',

    arbeidsgiveravgift: 20,
    feriepengesats: 20,
    lonnstilskuddProsent: '60',
    manedslonn: 10000,
    arbeidsgiverKontonummer: '123',
    stillingbeskrivelse: '',
    stillingtype: '',
};

export default lonnstilskuddAvtaleMock;

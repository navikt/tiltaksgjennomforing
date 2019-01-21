import { Avtale } from '../AvtaleSide/avtale';

const avtaleMock: Avtale = {

    id: 'qwertyuiop123456789',
    opprettetTidspunkt: '4 uker siden',
    versjon: '34',

    bekreftetAvBruker: false,
    bekreftetAvArbeidsgiver: false,
    bekreftetAvVeileder: false,

    oppfolging: 'bruker og AG skal følges opp',
    tilrettelegging: 'AG skal tilrettelegge',

    startDatoTimestamp: 99,
    arbeidstreningLengde: 8,
    arbeidstreningStillingprosent: 99,

    veilederNavIdent: 'string',
    veilederFornavn: 'string',
    veilederEtternavn: 'string',
    veilederEpost: 'string',
    veilederTlf: 'string',

    bedriftNavn: 'string',
    bedriftAdresse: 'string',
    bedriftPostnummer: 'string',
    bedriftPoststed: 'string',

    deltakerFornavn: 'string',
    deltakerEtternavn: 'string',
    deltakerAdresse: 'string',
    deltakerPostnummer: 'string',
    deltakerPoststed: 'string',
    deltakerFnr: '00000000000',

    arbeidsgiverFnr: '00000000000',
    arbeidsgiverFornavn: 'string',
    arbeidsgiverEtternavn: 'string',
    arbeidsgiverEpost: 'string',
    arbeidsgiverTlf: 'string',

    maal: [],
    oppgaver: [],
};

export default avtaleMock;
import { Avtale, Avtaleinnhold } from '@/types/avtale';
const tomtAvtaleInnholdInput: Required<Avtaleinnhold> = {
    arbeidsgiverEtternavn: '',
    arbeidsgiverFornavn: '',
    arbeidsgiverKontonummer: '',
    arbeidsgiverTlf: '',
    arbeidsgiveravgift: 0,
    bedriftNavn: '',
    deltakerEtternavn: '',
    deltakerFornavn: '',
    deltakerTlf: '',
    feriepengesats: 0,
    lonnstilskuddProsent: 0,
    maal: [],
    oppfolging: '',
    sluttDato: '',
    startDato: '',
    stillingprosent: 0,
    tilrettelegging: '',
    veilederEtternavn: '',
    veilederFornavn: '',
    veilederTlf: '',
    manedslonn: 0,
    arbeidsoppgaver: '',
    stillingstittel: '',
    mentorFornavn: '',
    mentorEtternavn: '',
    mentorOppgaver: '',
    mentorAntallTimer: 0,
    mentorTimelonn: 0,
    harFamilietilknytning: false,
    familietilknytningForklaring: '',
    feriepengerBelop: 0,
    otpBelop: 0,
    arbeidsgiveravgiftBelop: 0,
    sumLonnsutgifter: 0,
    sumLonnstilskudd: 0,
    manedslonn100pst: 0,
    tilskuddPeriode: [],
    stillingstype: 'FAST',
    stillingKonseptId: 123,
    stillingStyrk08: 1234,
};

const lagAvtaleObjektMedKunInputFelter = (avtale: Avtale) => {
    const newObj: any = {};
    Object.keys(avtale).forEach(key => {
        if (key in tomtAvtaleInnholdInput) {
            newObj[key] = avtale[key as keyof Avtaleinnhold];
        }
    });
    return newObj as Avtaleinnhold;
};

export { lagAvtaleObjektMedKunInputFelter };

import { AltAvtaleinnhold, Avtale } from '@/types/avtale';
const tomtAvtaleInnholdInput: Required<AltAvtaleinnhold> = {
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
    oppgaver: [],
    sluttDato: '',
    startDato: '',
    stillingprosent: 0,
    tilrettelegging: '',
    veilederEtternavn: '',
    veilederFornavn: '',
    veilederTlf: '',
    manedslonn: 0,
    arbeidsoppgaver: '',
    stillingtype: '',
    mentorFornavn: '',
    mentorEtternavn: '',
    mentorOppgaver: '',
    mentorAntallTimer: 0,
    mentorTimelonn: 0,
};

const lagAvtaleObjektMedKunInputFelter = (avtale: Avtale) => {
    const newObj: any = {};
    Object.keys(avtale).forEach(key => {
        if (key in tomtAvtaleInnholdInput) {
            newObj[key] = avtale[key as keyof AltAvtaleinnhold];
        }
    });
    return newObj as AltAvtaleinnhold;
};

export { lagAvtaleObjektMedKunInputFelter };

const OTP_PROSENT_SATS = 0.02;

export const feriepenger = (manedslonn?: number, feriepengesats?: number) => {
    return manedslonn && feriepengesats ? Math.round(manedslonn * feriepengesats) : 0;
};

export const sumLonnFeriePensjon = (manedslonn?: number, feriepenger?: number, obligTjenestepensjon?: number) => {
    return manedslonn && feriepenger && obligTjenestepensjon
        ? Math.round(manedslonn + feriepenger + obligTjenestepensjon)
        : 0;
};

export const arbeidsgiverAvgift = (sumLonnFeriePensjon?: number, arbeidsgiveravgiftSats?: number) => {
    return sumLonnFeriePensjon && arbeidsgiveravgiftSats ? Math.round(sumLonnFeriePensjon * arbeidsgiveravgiftSats) : 0;
};

export const obligTjenestepensjon = (manedslonn?: number, feriepenger?: number) => {
    return manedslonn && feriepenger ? Math.round((manedslonn + feriepenger) * OTP_PROSENT_SATS) : 0;
};

export const sumLonnstilskuddPerManed = (sumUtgifter?: number, lonnstilskuddProsent?: number) => {
    const ltsProsent = lonnstilskuddProsent ? lonnstilskuddProsent / 100 : 0;
    return sumUtgifter && lonnstilskuddProsent ? Math.round(sumUtgifter * ltsProsent) : 0;
};

export const lonnHundreProsent = (sumUtgifter?: number, stillingsprosent?: number) => {
    return sumUtgifter && stillingsprosent ? Math.round((sumUtgifter / stillingsprosent) * 100) : 0;
};

export const sumUtgifter = (
    manedslonn?: number,
    feriepenger?: number,
    obligTjenestepensjon?: number,
    arbeidsgiveravgift?: number
) => {
    if (manedslonn && feriepenger && obligTjenestepensjon && arbeidsgiveravgift !== undefined) {
        return Math.round(manedslonn + feriepenger + obligTjenestepensjon + arbeidsgiveravgift);
    } else {
        return 0;
    }
};

export const visTalletEller0 = (tallet?: number) => (tallet === 0 || tallet ? tallet : 0);
export const visSatsMedEttDesimal = (sats?: number) => (sats ? sats * 100 : 0).toFixed(1);

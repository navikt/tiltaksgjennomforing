const OTP_PROSENT_SATS = 2;

export const feriepenger = (manedsLonn?: number, feriepengesats?: number) => {
    return manedsLonn && feriepengesats ? Math.round((manedsLonn / 100) * feriepengesats) : 0;
};

export const sumLonnFeriePensjon = (manedsLonn?: number, feriepenger?: number, obligTjenestepensjon?: number) => {
    return manedsLonn && feriepenger && obligTjenestepensjon
        ? Math.round(manedsLonn + feriepenger + obligTjenestepensjon)
        : 0;
};

export const arbeidsgiveravgift = (sumLonnFeriePensjon?: number, arbeidsgiveravgiftSats?: number) => {
    return sumLonnFeriePensjon && arbeidsgiveravgiftSats
        ? Math.round((sumLonnFeriePensjon / 100) * arbeidsgiveravgiftSats)
        : 0;
};

export const obligTjenestepensjon = (manedsLonn?: number, feriepenger?: number) => {
    return manedsLonn && feriepenger ? Math.round(((manedsLonn + feriepenger) / 100) * OTP_PROSENT_SATS) : 0;
};

export const sumLonnstilskuddPerManed = (sumUtgifter?: number, lonnstilskuddProsent?: number) => {
    return sumUtgifter && lonnstilskuddProsent ? Math.round((sumUtgifter / 100) * lonnstilskuddProsent) : 0;
};

export const lonnHundreProsent = (sumUtgifter?: number, stillingsprosent?: number) => {
    return sumUtgifter && stillingsprosent ? Math.round((sumUtgifter / stillingsprosent) * 100) : 0;
};

export const sumUtgifter = (
    manedsLonn?: number,
    feriepenger?: number,
    obligTjenestepensjon?: number,
    arbeidsgiveravgift?: number
) => {
    if (manedsLonn && feriepenger && obligTjenestepensjon && arbeidsgiveravgift) {
        return Math.round(manedsLonn + feriepenger + obligTjenestepensjon + arbeidsgiveravgift);
    } else {
        return 0;
    }
};

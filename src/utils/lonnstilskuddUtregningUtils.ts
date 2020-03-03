const OTP_PROSENT_SATS = 0.02;

export const feriepenger = (manedsLonn?: number, feriepengesats?: number) => {
    return manedsLonn && feriepengesats ? Math.round(manedsLonn * feriepengesats) : 0;
};

export const sumLonnFeriePensjon = (manedsLonn?: number, feriepenger?: number, obligTjenestepensjon?: number) => {
    return manedsLonn && feriepenger && obligTjenestepensjon
        ? Math.round(manedsLonn + feriepenger + obligTjenestepensjon)
        : 0;
};

export const arbeidsgiveravgift = (sumLonnFeriePensjon?: number, arbeidsgiveravgiftSats?: number) => {
    return sumLonnFeriePensjon && arbeidsgiveravgiftSats ? Math.round(sumLonnFeriePensjon * arbeidsgiveravgiftSats) : 0;
};

export const obligTjenestepensjon = (manedsLonn?: number, feriepenger?: number) => {
    return manedsLonn && feriepenger ? Math.round((manedsLonn + feriepenger) * OTP_PROSENT_SATS) : 0;
};

export const sumLonnstilskuddPerManed = (sumUtgifter?: number, lonnstilskuddProsent?: number) => {
    const ltsProsent = lonnstilskuddProsent ? lonnstilskuddProsent / 100 : 0;
    return sumUtgifter && lonnstilskuddProsent ? Math.round(sumUtgifter * ltsProsent) : 0;
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
    if (manedsLonn && feriepenger && obligTjenestepensjon && arbeidsgiveravgift !== undefined) {
        return Math.round(manedsLonn + feriepenger + obligTjenestepensjon + arbeidsgiveravgift);
    } else {
        return 0;
    }
};

export const visTalletEller0 = (tallet?: number) => (tallet === 0 || tallet ? tallet : 0);
export const visSatsMedEttDesimal = (sats?: number) => (sats ? sats * 100 : 0).toFixed(1);

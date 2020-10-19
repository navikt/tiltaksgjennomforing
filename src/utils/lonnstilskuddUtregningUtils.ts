export const lonnHundreProsent = (sumUtgifter?: number, stillingsprosent?: number) => {
    return sumUtgifter && stillingsprosent ? Math.round((sumUtgifter / stillingsprosent) * 100) : 0;
};

export const visTalletEller0 = (tallet?: number) => (tallet === 0 || tallet ? tallet : 0);
export const visSatsMedEttDesimal = (sats?: number) => (sats ? sats * 100 : 0).toFixed(1);

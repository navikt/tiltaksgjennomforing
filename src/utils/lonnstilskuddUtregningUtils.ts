export const visTalletEller0 = (tallet?: number) => (tallet === 0 || tallet ? tallet : 0);
export const visSatsMedEttDesimal = (sats?: number) => (sats ? sats * 100 : 0).toFixed(1);
export const parseFloatIfFloatable = (verdi: string) => {
    const floatedValue = parseFloat(verdi);
    if (!isNaN(floatedValue)) {
        return parseFloat(verdi);
    } else {
        return undefined;
    }
};

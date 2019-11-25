// https://www.miles.no/blogg/tema/teknisk/validering-av-norske-data

export const validerOrgnr = (orgNumber: string) => {
    if (orgNumber.length !== 9) {
        return false;
    }
    return parseInt(orgNumber.charAt(orgNumber.length - 1), 10) === mod11OfNumberWithControlDigit(orgNumber);
};

const mod11OfNumberWithControlDigit = (input: any) => {
    let controlNumber = 2;
    let sumForMod = 0;
    let i;

    for (i = input.length - 2; i >= 0; --i) {
        sumForMod += input.charAt(i) * controlNumber;
        if (++controlNumber > 7) {
            controlNumber = 2;
        }
    }
    const result = 11 - (sumForMod % 11);

    return result === 11 ? 0 : result;
};

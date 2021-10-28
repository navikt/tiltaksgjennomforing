/** Beregner gyldighet av fødselsnr med utgangspunkt i mod11.
 * @link https://no.wikipedia.org/wiki/F%C3%B8dselsnummer
 * @param verdi
 * @returns {boolean}
 */

interface GyldigAarhundre {
    aarhundre: number;
    gyldig: boolean;
}

export interface VellykketGenerertIsoDatoString {
    isoDatostring: string;
    vellykketgenerering: boolean;
}

const validerFnr = (verdi: string): boolean => {
    const fodselsnr = verdi.toString();
    if (!fodselsnr || fodselsnr.length !== 11) {
        return false;
    }

    const vekt1 = [3, 7, 6, 1, 8, 9, 4, 5, 2];
    const vekt2 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

    const Q1 = vekt1.reduce((samling, tall, indeks) => samling + parseInt(fodselsnr.charAt(indeks), 10) * tall, 0);

    const Q2 = vekt2.reduce((samling, tall, indeks) => samling + parseInt(fodselsnr.charAt(indeks), 10) * tall, 0);

    let k1 = 11 - (Q1 % 11);
    if (k1 === 11) {
        k1 = 0;
    }

    let k2 = 11 - (Q2 % 11);
    if (k2 === 11) {
        k2 = 0;
    }

    return k1 === parseInt(fodselsnr.charAt(9), 10) && k2 === parseInt(fodselsnr.charAt(10), 10);
};

const isDNumber = (n: number) => n > 40 && n < 72;

const hentAarhundreTilFnr = (kSiffer: number, fodselAar: number): GyldigAarhundre => {
    switch (true) {
        case kSiffer >= 0 && kSiffer <= 499:
            return { aarhundre: 19, gyldig: true };
        case kSiffer >= 500 && kSiffer <= 749 && fodselAar >= 55:
            return { aarhundre: 18, gyldig: true };
        case kSiffer >= 500 && kSiffer <= 999 && fodselAar <= 39:
            return { aarhundre: 20, gyldig: true };
        case kSiffer >= 900 && kSiffer <= 999 && fodselAar >= 40:
            return { aarhundre: 19, gyldig: true };
        default:
            return { aarhundre: 0, gyldig: false };
    }
};

const lagDatoString = (isoDatoVerdier: number[]): string => {
    return isoDatoVerdier
        .map((v) => {
            const datoFragment = v.toFixed(0);
            return datoFragment.length === 1 ? '0'.concat(datoFragment) : datoFragment;
        })
        .join('-');
};

const genererFnrDatoStringFraFnr = (n: string): VellykketGenerertIsoDatoString => {
    try {
        const dag = parseInt(n.substring(0, 2), 10);
        const mnd = parseInt(n.substring(2, 4), 10);
        const aar = parseInt(n.substring(4, 6), 10);
        const kontrollsiffer = parseInt(n.substring(6, 9), 10);
        const gyldigAarhundre = hentAarhundreTilFnr(kontrollsiffer, aar);

        if (gyldigAarhundre.gyldig) {
            const isoDatoStringFraFnr = lagDatoString([
                gyldigAarhundre.aarhundre * 100 + aar,
                mnd,
                isDNumber(dag) ? dag - 40 : dag,
            ]);
            return { isoDatostring: isoDatoStringFraFnr, vellykketgenerering: true };
        }
    } catch (err) {
        console.warn('feilet med generering av iso-datostring fra fnr ', err);
    }
    return { isoDatostring: '', vellykketgenerering: false };
};

export { validerFnr, genererFnrDatoStringFraFnr };

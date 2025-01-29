import { formaterNorskeTall, parseNorskeTallFraInput } from '@/utils/tallUtils';

export const formaterProsent = <T>(value: T): string => {
    const valueSomTall = parseNorskeTallFraInput(value);
    if (!valueSomTall && valueSomTall !== 0) {
        return '';
    }
    return `${formaterNorskeTall(valueSomTall)} %`;
};

import { erNil } from '@/utils/predicates';
import { formaterNorskeTall, parseNorskeTall } from '@/utils/tallUtils';

export const parseProsent = (value: unknown, desimalbrok = false): number | undefined => {
    const tall = parseNorskeTall(value);
    if (tall === undefined || isNaN(tall)) {
        return undefined;
    }
    return desimalbrok ? tall / 100 : tall;
};

export const formaterProsent = (value: string | number | undefined, desimalbrok = false): string | undefined => {
    const tall = parseNorskeTall(value);
    if (tall === undefined || isNaN(tall)) {
        return !erNil(value) ? String(value) : undefined;
    }
    return (formaterNorskeTall(desimalbrok ? tall * 100 : tall) ?? '') + '\u00A0%';
};

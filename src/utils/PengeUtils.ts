import { erNil } from './predicates';

const IKKE_NOE_BELOP_TEGN = '—';

function formaterPenger(penger: number | undefined, ikkeNoeBelopTegn: string): string;
function formaterPenger(penger: number, ikkeNoeBelopTegn?: undefined): string;
function formaterPenger(penger: number | undefined, ikkeNoeBelopTegn?: string): string {
    if (!erNil(ikkeNoeBelopTegn) && erNil(penger)) {
        return ikkeNoeBelopTegn;
    }
    return `${new Intl.NumberFormat('nb-NO', {
        style: 'decimal',
        maximumFractionDigits: 2,
    }).format(penger as number)} kr`; // OBS: function overloading fanger at 'penger' ikke er undefined her
}

export { formaterPenger, IKKE_NOE_BELOP_TEGN };

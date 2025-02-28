import { TiltaksType } from '@/types/avtale';

export const vtaoToggleFilter = (vtaoTiltakToggle: boolean): TiltaksType[] =>
    [
        'ARBEIDSTRENING',
        'INKLUDERINGSTILSKUDD',
        'MENTOR',
        'MIDLERTIDIG_LONNSTILSKUDD',
        'VARIG_LONNSTILSKUDD',
        'SOMMERJOBB',
        'VTAO',
    ].filter((tiltak) => {
        if (tiltak === 'VTAO') {
            return vtaoTiltakToggle;
        }
        return true;
    }) as TiltaksType[];

import { TiltaksType } from '@/types/avtale';

export const tiltakToggleFilter = (firearigLonnstilskuddAktivert: boolean): TiltaksType[] =>
    [
        'ARBEIDSTRENING',
        'INKLUDERINGSTILSKUDD',
        'MENTOR',
        'MIDLERTIDIG_LONNSTILSKUDD',
        'VARIG_LONNSTILSKUDD',
        'SOMMERJOBB',
        'VTAO',
        'FIREARIG_LONNSTILSKUDD',
    ].filter((tiltak) => {
        if (tiltak === 'FIREARIG_LONNSTILSKUDD') {
            return firearigLonnstilskuddAktivert;
        }
        return true;
    }) as TiltaksType[];

import { TiltaksType } from '@/types/avtale';

const tiltakstyper: TiltaksType[] = ['VARIG_LONNSTILSKUDD', 'MIDLERTIDIG_LONNSTILSKUDD', 'SOMMERJOBB', 'VTAO'];

export const deltakerenErAnsatt = (tiltakstype: TiltaksType) => {
    return tiltakstyper.includes(tiltakstype);
};

import { TiltaksType } from '../types/avtale';

export const deltakerenErAnsatt = (tiltakstype: TiltaksType) => {
    const tiltakstyper: TiltaksType[] = ['VARIG_LONNSTILSKUDD', 'MIDLERTIDIG_LONNSTILSKUDD', 'SOMMERJOBB', 'VTAO'];
    return tiltakstyper.includes(tiltakstype);
};

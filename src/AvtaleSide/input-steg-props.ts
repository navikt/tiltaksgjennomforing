import { Avtaleinnhold } from '@/types/avtale';
import { SettAvtaleVerdi, SettFlereAvtaleVerdier } from '@/AvtaleProvider';

export type InputStegProps<T extends Partial<Avtaleinnhold>> = {
    avtale: T;
    settAvtaleVerdi: SettAvtaleVerdi;
    settAvtaleVerdier: SettFlereAvtaleVerdier;
    lagreAvtale: () => Promise<any>;
};

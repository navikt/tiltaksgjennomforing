import { SettAvtaleVerdi, SettFlereAvtaleVerdier } from '@/AvtaleProvider';
import { Avtaleinnhold } from '@/types/avtale';

export type InputStegProps<T extends Partial<Avtaleinnhold>> = {
    avtale: T;
    settAvtaleVerdi: SettAvtaleVerdi;
    settAvtaleVerdier: SettFlereAvtaleVerdier;
    sjekkOgLagreAvtale: () => Promise<any>;
};

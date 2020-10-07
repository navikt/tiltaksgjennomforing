import { Avtaleinnhold } from '@/types/avtale';

export type InputStegProps<T extends Partial<Avtaleinnhold>> = {
    avtale: T;
    settAvtaleVerdi: (felt: keyof T, verdi: any) => void;
    settAvtaleVerdier: (endringer: Partial<T>) => void;
    lagreAvtale: () => Promise<any>;
};

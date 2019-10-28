import { Avtale } from '@/types/avtale';

export type InputStegProps<T extends Partial<Avtale>> = {
    avtale: T;
    settAvtaleVerdi: (felt: keyof T, verdi: any) => void;
    lagreAvtale: () => Promise<any>;
};

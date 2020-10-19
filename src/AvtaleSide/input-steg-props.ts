import { Avtaleinnhold } from '@/types/avtale';
import { SettAvtaleVerdi } from '@/AvtaleProvider';

export type InputStegProps<T extends Partial<Avtaleinnhold>> = {
    avtale: T;
    settAvtaleVerdi: SettAvtaleVerdi;
    settAvtaleVerdier: (endringer: Partial<T>) => void;
    lagreAvtale: () => Promise<any>;
};

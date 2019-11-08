import { ArbeidstreningAvtale } from '@/types/avtale';
import avtaleMock from './avtale-mock';

const avtaleListeMock: ArbeidstreningAvtale[] = [avtaleMock, avtaleMock, avtaleMock].map((avtale, index) => {
    return {
        ...avtale,
        id: `${index}`,
        opprettetTidspunkt: `opprettet ${index}`,
    };
});

export default avtaleListeMock;

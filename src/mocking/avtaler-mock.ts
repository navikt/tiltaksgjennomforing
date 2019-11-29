import { ArbeidstreningAvtaleinnhold, Avtale } from '@/types/avtale';
import arbeidstreningAvtaleMock from './arbeidstrening-avtale-mock';

const avtaleListeMock: Avtale<ArbeidstreningAvtaleinnhold>[] = [
    arbeidstreningAvtaleMock,
    arbeidstreningAvtaleMock,
    arbeidstreningAvtaleMock,
].map((avtale, index) => {
    return {
        ...avtale,
        id: `${index}`,
        opprettetTidspunkt: `opprettet ${index}`,
    };
});

export default avtaleListeMock;

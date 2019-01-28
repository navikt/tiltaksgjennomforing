import { Avtale } from '../AvtaleSide/avtale';
import avtaleMock from './avtale-mock';

const avtaleListeMock: Avtale[] = [avtaleMock, avtaleMock, avtaleMock].map(
    (avtale, index) => {
        return {
            ...avtale,
            id: `${index}`,
            opprettetTidspunkt: `opprettet ${index}`,
        };
    }
);

export default avtaleListeMock;

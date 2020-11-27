import { AdresseError, ApiError, AutentiseringError, FeilkodeError, UfullstendigError } from '@/types/errors';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';

export const handterFeil = (
    error: Error,
    visFeilmelding: (feilmelding: string) => void,
    fallbackMelding: string = 'Det har skjedd en uventet feil'
) => {
    switch (error.constructor) {
        case FeilkodeError:
            visFeilmelding(Feilmeldinger[error.message as Feilkode]);
            break;
        case AdresseError:
            break;
        case ApiError:
        case UfullstendigError:
            visFeilmelding(error.message || fallbackMelding);
            break;
        case AutentiseringError:
            visFeilmelding('Innloggingen din har utløpt. Ta vare på endringene dine og oppfrisk siden.');
            break;
        default:
            throw error;
    }
};

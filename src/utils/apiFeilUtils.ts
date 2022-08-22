import { AdresseError, ApiError, AutentiseringError, FeilkodeError, UfullstendigError } from '@/types/errors';
import { Feilkode, Feilmeldinger } from '@/types/feilkode';
import * as Sentry from '@sentry/react';

export const handterFeil = (
    error: Error,
    visFeilmelding: (feilmelding: string) => void,
    fallbackMelding: string = 'Det har skjedd en uventet feil'
) => {
    switch (error.constructor) {
        case FeilkodeError:
            const feilmeldingTekst = Feilmeldinger[(error?.message as Feilkode) ?? ''];
            if (!feilmeldingTekst) {
                visFeilmelding('Det har skjedd en feil: ' + error.message);
                Sentry.captureEvent({ message: 'Feilmelding er ikke mappet: ' + error.message });
                break;
            }
            visFeilmelding(feilmeldingTekst);
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

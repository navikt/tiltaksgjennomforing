import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { DatepickerLimitations } from 'nav-datovelger';
import moment, { DurationInputArg2 } from 'moment';
import { useContext } from 'react';
import { Kvalifiseringsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/KvalifiseringsgruppeSats/KvalifiseringsgruppeSats';

export const AvtaleMinMaxDato = (): DatepickerLimitations => {
    const { avtale } = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

    const erTiltakstype = (tiltakstype: string): boolean => tiltakstype === avtale.tiltakstype;

    const startdatoPluss = (megde: number, tidsEnhet: DurationInputArg2): string =>
        moment(avtale.startDato).add(1, 'years').format('YYYY-MM-DD');

    if (avtale.startDato) {
        if (erTiltakstype('MIDLERTIDIG_LONNSTILSKUDD')) {
            return {
                minDate: innloggetBruker.erNavAnsatt ? undefined : new Date().toISOString(),
                maxDate:
                    avtale.kvalifiseringsgruppe === Kvalifiseringsgruppe.SITUASJONSBESTEMT_INNSATS ||
                    avtale.kvalifiseringsgruppe === null
                        ? startdatoPluss(1, 'years')
                        : startdatoPluss(2, 'years'),
            };
        }
        if (erTiltakstype('ARBEIDSTRENING')) {
            return {
                minDate: innloggetBruker.erNavAnsatt ? undefined : new Date().toISOString(),
                maxDate: startdatoPluss(18, 'months'),
            };
        }
        if (erTiltakstype('SOMMERJOBB')) {
            return {
                minDate: new Date(new Date().getFullYear(), 5, 2).toISOString(),
                maxDate: startdatoPluss(4, 'weeks'),
            };
        }
        if (erTiltakstype('VARIG_LONNSTILSKUDD')) {
            return {
                minDate: innloggetBruker.erNavAnsatt ? undefined : new Date().toISOString(),
                maxDate: undefined,
            };
        }
    }
    return {
        minDate: innloggetBruker.erNavAnsatt ? undefined : new Date().toISOString(),
        maxDate: undefined,
    };
};

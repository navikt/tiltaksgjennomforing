import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { DatepickerLimitations } from 'nav-datovelger';
import moment from 'moment';
import React, { useContext } from 'react';

export const AvtaleMinMaxDato = (): DatepickerLimitations => {
    const avtaleContext = useContext(AvtaleContext);
    const innloggetBruker = useContext(InnloggetBrukerContext);

    if (avtaleContext.avtale.startDato !== null) {
        console.log('tiltakstype', avtaleContext.avtale.tiltakstype);
        console.log('kvalifiseringsgruppe', avtaleContext.avtale.kvalifiseringsgruppe);

        if (avtaleContext.avtale.tiltakstype === 'MIDLERTIDIG_LONNSTILSKUDD') {
            return {
                minDate: innloggetBruker.erNavAnsatt ? undefined : new Date().toISOString(),
                maxDate:
                    avtaleContext.avtale.kvalifiseringsgruppe === 'BFORM' ||
                    avtaleContext.avtale.kvalifiseringsgruppe === null
                        ? moment(avtaleContext.avtale.startDato).add(1, 'years').format('YYYY-MM-DD')
                        : moment(avtaleContext.avtale.startDato).add(2, 'years').format('YYYY-MM-DD'),
            };
        }
        if (avtaleContext.avtale.tiltakstype === 'ARBEIDSTRENING') {
            return {
                minDate: innloggetBruker.erNavAnsatt ? undefined : new Date().toISOString(),
                maxDate: moment(avtaleContext.avtale.startDato).add(18, 'months').format('YYYY-MM-DD'),
            };
        }
        if (avtaleContext.avtale.tiltakstype === 'SOMMERJOBB') {
            return {
                minDate: new Date(new Date().getFullYear(), 5, 2).toISOString(),
                maxDate: moment(avtaleContext.avtale.startDato).add(4, 'weeks').format('YYYY-MM-DD'),
            };
        }
        if (avtaleContext.avtale.tiltakstype === 'VARIG_LONNSTILSKUDD') {
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

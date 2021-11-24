import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { DatepickerLimitations } from 'nav-datovelger';
import moment, { DurationInputArg2 } from 'moment';
import { useContext } from 'react';
import { Kvalifiseringsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';

export const AvtaleMinMaxDato = (): DatepickerLimitations => {
    const INGEN_DATO_SPERRE = undefined;
    const DAGENSDATO = new Date().toISOString();

    const { avtale } = useContext(AvtaleContext);
    const { erNavAnsatt } = useContext(InnloggetBrukerContext);

    const erTiltakstype = (tiltakstype: string): boolean => tiltakstype === avtale.tiltakstype;

    const startdatoPluss = (megde: number, tidsEnhet: DurationInputArg2): string =>
        moment(avtale.startDato).add(megde, tidsEnhet).format('YYYY-MM-DD');

    const settdatoBegrensningTiltakstype = (tiltakstype: string) => {
        switch (tiltakstype) {
            case 'MIDLERTIDIG_LONNSTILSKUDD':
                return {
                    minDate: erNavAnsatt ? INGEN_DATO_SPERRE : DAGENSDATO,
                    maxDate:
                        avtale.kvalifiseringsgruppe === Kvalifiseringsgruppe.SITUASJONSBESTEMT_INNSATS ||
                        !avtale.kvalifiseringsgruppe
                            ? startdatoPluss(1, 'years')
                            : startdatoPluss(2, 'years'),
                };
            case 'ARBEIDSTRENING':
                return { minDate: erNavAnsatt ? INGEN_DATO_SPERRE : DAGENSDATO, maxDate: startdatoPluss(18, 'months') };
            case 'SOMMERJOBB':
                return {
                    minDate: new Date(new Date().getFullYear(), 5, 2).toISOString(),
                    maxDate: startdatoPluss(4, 'weeks'),
                };
            default:
                return { minDate: erNavAnsatt ? INGEN_DATO_SPERRE : DAGENSDATO, maxDate: INGEN_DATO_SPERRE };
        }
    }

    if (avtale.startDato) {
        settdatoBegrensningTiltakstype(avtale.tiltakstype);
    }
    return { minDate: erNavAnsatt ? INGEN_DATO_SPERRE : DAGENSDATO, maxDate: INGEN_DATO_SPERRE };
};

import useInnlogget from '@/InnloggingBoundary/useInnlogget';
import { Kvalifiseringsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';
import { datoFraDagensDato, datoMinus, datoPluss } from '@/utils/datoUtils';
import { useAvtale } from '@/AvtaleProvider';

export declare type ISODateString = string;
interface DatepickerDateRange {
    from: ISODateString;
    to: ISODateString;
}
type DaysOfWeekModifier = [1, 2, 3, ''];
interface DatepickerLimitations {
    minDate?: ISODateString;
    maxDate?: ISODateString;
    invalidDateRanges?: DatepickerDateRange[];
    weekendsNotSelectable?: boolean;
    disabledDaysOfWeek?: DaysOfWeekModifier;
}

export const useAvtaleMinMaxDato = (startDatePicker: boolean): DatepickerLimitations => {
    const INGEN_DATO_SPERRE = undefined;
    const DAGENSDATO = new Date().toISOString();
    const EN_UKE_SIDEN = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
    const SISTE_MULIGE_SOMMERJOBB_START_DAG = new Date(new Date().getFullYear(), 8, 1).toISOString();
    const SISTE_MULIGE_SOMMERJOBB_SLUTT_DAG = new Date(new Date().getFullYear(), 8, 28).toISOString();

    const { avtale } = useAvtale();
    const { innloggetBruker } = useInnlogget();
    const erVeileder = innloggetBruker?.rolle === 'VEILEDER';

    const sjekkMuligMinDato = (mengde?: number | undefined) => {
        if (!erVeileder) {
            return DAGENSDATO;
        }
        if (avtale.godkjentForEtterregistrering) {
            return INGEN_DATO_SPERRE;
        }
        if (startDatePicker) {
            if (avtale.gjeldendeInnhold.sluttDato) {
                const minsteStartdatoBasertPaaSluttdato = datoMinus(avtale.gjeldendeInnhold.sluttDato, {
                    years: mengde,
                });
                if (minsteStartdatoBasertPaaSluttdato === undefined) return EN_UKE_SIDEN;
                if (mengde) {
                    if (minsteStartdatoBasertPaaSluttdato < EN_UKE_SIDEN) {
                        return EN_UKE_SIDEN;
                    } else {
                        return minsteStartdatoBasertPaaSluttdato;
                    }
                }
            }
            return EN_UKE_SIDEN;
        } else if (avtale.gjeldendeInnhold.startDato) {
            return avtale.gjeldendeInnhold.startDato;
        }
    };

    const datoDefaultVerdi = () => ({
        minDate: sjekkMuligMinDato(),
        maxDate: INGEN_DATO_SPERRE,
    });

    switch (avtale.tiltakstype) {
        case 'SOMMERJOBB': {
            if (startDatePicker) {
                return {
                    minDate: sjekkMuligMinDato(),
                    maxDate: SISTE_MULIGE_SOMMERJOBB_START_DAG,
                };
            }
            if (avtale.gjeldendeInnhold.startDato) {
                return {
                    minDate: datoPluss(avtale.gjeldendeInnhold.startDato, { days: 1 }),
                    maxDate: datoPluss(avtale.gjeldendeInnhold.startDato, { days: 28 }),
                };
            }
            return {
                minDate: sjekkMuligMinDato(),
                maxDate: SISTE_MULIGE_SOMMERJOBB_SLUTT_DAG,
            };
        }
        case 'MIDLERTIDIG_LONNSTILSKUDD': {
            const maksDato =
                !avtale.kvalifiseringsgruppe ||
                avtale.kvalifiseringsgruppe === Kvalifiseringsgruppe.SITUASJONSBESTEMT_INNSATS
                    ? 1
                    : 2;
            if (!startDatePicker && avtale.gjeldendeInnhold.startDato) {
                return {
                    minDate: sjekkMuligMinDato(maksDato),
                    maxDate: datoPluss(avtale.gjeldendeInnhold.startDato, { years: maksDato }),
                };
            }
            return {
                minDate: sjekkMuligMinDato(maksDato),
                maxDate: datoFraDagensDato({ years: maksDato }),
            };
        }
        case 'VARIG_LONNSTILSKUDD': {
            return datoDefaultVerdi();
        }
        case 'ARBEIDSTRENING': {
            if (startDatePicker) {
                return datoDefaultVerdi();
            }
            if (avtale.gjeldendeInnhold.startDato) {
                return {
                    minDate: datoPluss(avtale.gjeldendeInnhold.startDato, { days: 1 }),
                    maxDate: datoPluss(avtale.gjeldendeInnhold.startDato, { months: 18 }),
                };
            }
            return {
                minDate: sjekkMuligMinDato(),
                maxDate: datoFraDagensDato({ months: 18 }),
            };
        }
        case 'MENTOR': {
            return datoDefaultVerdi();
        }
        case 'INKLUDERINGSTILSKUDD': {
            if (startDatePicker) {
                return {
                    minDate: sjekkMuligMinDato(),
                    maxDate: datoFraDagensDato({ years: 1 }),
                };
            }
            if (avtale.gjeldendeInnhold.startDato) {
                return {
                    minDate: avtale.gjeldendeInnhold.startDato,
                    maxDate: datoPluss(avtale.gjeldendeInnhold.startDato, { years: 1 }),
                };
            } else {
                return {
                    minDate: sjekkMuligMinDato(),
                    maxDate: datoFraDagensDato({ years: 1 }),
                };
            }
        }
        case 'VTAO':
            return datoDefaultVerdi();
        case 'FIREARIG_LONNSTILSKUDD': {
            const maksDato = avtale.gjeldendeInnhold.stillingstype === 'MIDLERTIDIG' ? 2 : 4;
            if (!startDatePicker && avtale.gjeldendeInnhold.startDato) {
                return {
                    minDate: sjekkMuligMinDato(maksDato),
                    maxDate: datoPluss(avtale.gjeldendeInnhold.startDato, { years: maksDato }),
                };
            }
            return {
                minDate: sjekkMuligMinDato(maksDato),
                maxDate: datoFraDagensDato({ years: maksDato }),
            };
        }
    }
};

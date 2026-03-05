import { AvtaleContext } from '@/AvtaleProvider';
import { Kvalifiseringsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { TiltaksType } from '@/types/avtale';
import { add, addDays, Duration, format, sub } from 'date-fns';
import { useContext } from 'react';

export declare type ISODateString = string;
export declare type InputDateString = string;
export declare type INVALID_DATE_TYPE = 'Invalid date';
export interface DatepickerDateRange {
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

export const AvtaleMinMaxDato = (startDatePicker: boolean): DatepickerLimitations => {
    const INGEN_DATO_SPERRE = undefined;
    const DAGENSDATO = new Date().toISOString();
    const EN_UKE_SIDEN = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
    const SISTE_MULIGE_SOMMERJOBB_START_DAG = new Date(new Date().getFullYear(), 8, 1).toISOString();
    const SISTE_MULIGE_SOMMERJOBB_SLUTT_DAG = new Date(new Date().getFullYear(), 8, 28).toISOString();

    const { avtale } = useContext(AvtaleContext);
    const { rolle } = useContext(InnloggetBrukerContext);
    const erVeileder = rolle === 'VEILEDER';

    const startdatoPluss = (duration: Duration): string | undefined => {
        try {
            return format(add(addDays(avtale.gjeldendeInnhold.startDato!, -1), duration), 'yyyy-MM-dd');
        } catch (e) {
            return undefined;
        }
    };

    const startdatoFraAvtalensSluttDato = (duration: Duration): string | undefined => {
        try {
            return format(sub(addDays(avtale.gjeldendeInnhold.sluttDato!, 1), duration), 'yyyy-MM-dd');
        } catch (e) {
            return undefined;
        }
    };

    const sluttDatoFraDagensDato = (duration: Duration): string | undefined => {
        try {
            format(add(addDays(new Date(), -1), duration), 'yyyy-MM-dd');
        } catch (e) {
            return undefined;
        }
    };

    const settdatoBegrensningTiltakstype = (tiltakstype: TiltaksType) => {
        switch (tiltakstype) {
            case 'SOMMERJOBB':
                if (startDatePicker === true) {
                    return {
                        minDate: sjekkMuligMinDato(),
                        maxDate: SISTE_MULIGE_SOMMERJOBB_START_DAG,
                    };
                }
                if (avtale.gjeldendeInnhold.startDato) {
                    return {
                        minDate: startdatoPluss({ days: 1 }),
                        maxDate: startdatoPluss({ days: 28 }),
                    };
                }
                return {
                    minDate: sjekkMuligMinDato(),
                    maxDate: SISTE_MULIGE_SOMMERJOBB_SLUTT_DAG,
                };
            case 'MIDLERTIDIG_LONNSTILSKUDD':
                return sjekkMidlertidigLønnstilskuddDato();

            case 'VARIG_LONNSTILSKUDD':
                return datoDefaultVerdi();
            case 'ARBEIDSTRENING':
                if (startDatePicker === true) {
                    return datoDefaultVerdi();
                }
                if (avtale.gjeldendeInnhold.startDato) {
                    return {
                        minDate: startdatoPluss({ days: 1 }),
                        maxDate: startdatoPluss({ months: 18 }),
                    };
                }
                return {
                    minDate: sjekkMuligMinDato(),
                    maxDate: sluttDatoFraDagensDato({ months: 18 }),
                };

            case 'MENTOR':
                return datoDefaultVerdi();
            case 'INKLUDERINGSTILSKUDD':
                if (startDatePicker === true) {
                    return {
                        minDate: sjekkMuligMinDato(),
                        maxDate: sluttDatoFraDagensDato({ years: 1 }),
                    };
                }
                if (avtale.gjeldendeInnhold.startDato) {
                    return {
                        minDate: avtale.gjeldendeInnhold.startDato,
                        maxDate: startdatoPluss({ years: 1 }),
                    };
                } else {
                    return {
                        minDate: sjekkMuligMinDato(),
                        maxDate: sluttDatoFraDagensDato({ years: 1 }),
                    };
                }
            case 'VTAO':
                return datoDefaultVerdi();
            case 'FIREARIG_LONNSTILSKUDD':
                return datoDefaultVerdi();
        }
    };

    const sjekkMuligMinDato = (mengde?: number | undefined) => {
        if (erVeileder) {
            if (avtale.godkjentForEtterregistrering) {
                return INGEN_DATO_SPERRE;
            }
            if (startDatePicker) {
                if (avtale.gjeldendeInnhold.sluttDato) {
                    const minsteStartdatoBasertPåSluttdato = startdatoFraAvtalensSluttDato({ years: mengde });
                    if (minsteStartdatoBasertPåSluttdato === undefined) return EN_UKE_SIDEN;
                    if (mengde) {
                        if (minsteStartdatoBasertPåSluttdato < EN_UKE_SIDEN) {
                            return EN_UKE_SIDEN;
                        } else {
                            return minsteStartdatoBasertPåSluttdato;
                        }
                    }
                }
                return EN_UKE_SIDEN;
            } else if (avtale.gjeldendeInnhold.startDato) {
                return avtale.gjeldendeInnhold.startDato;
            }
        } else {
            return DAGENSDATO;
        }
    };

    const sjekkMidlertidigLønnstilskuddDato = () => {
        const maksDato =
            !avtale.kvalifiseringsgruppe ||
            avtale.kvalifiseringsgruppe === Kvalifiseringsgruppe.SITUASJONSBESTEMT_INNSATS
                ? 1
                : 2;
        if (startDatePicker) {
            return {
                minDate: sjekkMuligMinDato(maksDato),
                maxDate: sluttDatoFraDagensDato({ years: maksDato }),
            };
        }
        if (avtale.gjeldendeInnhold.startDato) {
            return {
                minDate: sjekkMuligMinDato(maksDato),
                maxDate: startdatoPluss({ years: maksDato }),
            };
        }
        return {
            minDate: sjekkMuligMinDato(maksDato),
            maxDate: sluttDatoFraDagensDato({ years: maksDato }),
        };
    };

    const datoDefaultVerdi = () => ({
        minDate: sjekkMuligMinDato(),
        maxDate: INGEN_DATO_SPERRE,
    });

    if (avtale.gjeldendeInnhold.startDato) {
        settdatoBegrensningTiltakstype(avtale.tiltakstype);
    }

    return settdatoBegrensningTiltakstype(avtale.tiltakstype);
};

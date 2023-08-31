import { AvtaleContext } from '@/AvtaleProvider';
import { Kvalifiseringsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { TiltaksType } from '@/types/avtale';
import moment, { DurationInputArg2, } from 'moment';
import { useContext } from 'react';

export declare type ISODateString = string;
export declare type InputDateString = string;
export declare type INVALID_DATE_TYPE = 'Invalid date';
export interface DatepickerDateRange {
    from: ISODateString;
    to: ISODateString;
}
type DaysOfWeekModifier =  [
    1, 2, 3, "", 
]
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

    const startdatoPluss = (megde: number, tidsEnhet: DurationInputArg2): any => {
        return moment(avtale.gjeldendeInnhold.startDato).add(megde, tidsEnhet).toISOString();
    };

    const startdatoFraAvtalensSluttDato = (megde: number, tidsEnhet: DurationInputArg2): any => {
        console.log('før',moment(avtale.gjeldendeInnhold.sluttDato).subtract(megde, tidsEnhet).toISOString());
        console.log('etter',moment(avtale.gjeldendeInnhold.sluttDato).utc().subtract(megde, tidsEnhet).toISOString());
        return moment(avtale.gjeldendeInnhold.sluttDato).utc().subtract(megde, tidsEnhet).toISOString();
    };
/*
    const startdatoFraAvtalensSluttDatoTest = (): any => {
        return new Date(avtale.gjeldendeInnhold.sluttDato).
    }
*/
    const sluttDatoFraDagensDato = (megde: number, tidsEnhet: DurationInputArg2): any => {
        return moment(new Date()).add(megde, tidsEnhet).subtract(1, 'days').toISOString();
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
                        minDate: startdatoPluss(1, 'days'),
                        maxDate: startdatoPluss(28, 'days'),
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
                        minDate: startdatoPluss(1, 'days'),
                        maxDate: startdatoPluss(18, 'months'),
                    };
                }
                return {
                    minDate: sjekkMuligMinDato(),
                    maxDate: sluttDatoFraDagensDato(18, 'months'),
                };

            case 'MENTOR':
                return datoDefaultVerdi();
            case 'INKLUDERINGSTILSKUDD':
                if (startDatePicker === true) {
                    return {
                        minDate: sjekkMuligMinDato(),
                        maxDate: sluttDatoFraDagensDato(1, 'years'),
                    };
                }
                if (avtale.gjeldendeInnhold.startDato) {
                    return {
                        minDate: avtale.gjeldendeInnhold.startDato,
                        maxDate: startdatoPluss(1, 'years'),
                    };
                } else {
                    return {
                        minDate: sjekkMuligMinDato(),
                        maxDate: sluttDatoFraDagensDato(1, 'years'),
                    };
                }
        }
    };

    const sjekkMuligMinDato = (mengde? : number | undefined) => {
        if (erVeileder) {
            if (avtale.godkjentForEtterregistrering) {
                return INGEN_DATO_SPERRE;
            }
            if(startDatePicker){
                if(avtale.gjeldendeInnhold.sluttDato){
                    if(mengde){
                        if(startdatoFraAvtalensSluttDato(mengde, 'years') < EN_UKE_SIDEN){
                            console.log("startdato",startdatoFraAvtalensSluttDato(mengde, 'years'))
                            console.log("En uke siden" , EN_UKE_SIDEN);
                            return EN_UKE_SIDEN
                        }
                        else {
                            return startdatoFraAvtalensSluttDato(mengde, 'years');
                        }
                    }
                                            
                }
                return EN_UKE_SIDEN;
            }

            else if(avtale.gjeldendeInnhold.startDato){
                return avtale.gjeldendeInnhold.startDato
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
                maxDate: sluttDatoFraDagensDato(maksDato, 'years'),
            };
        }
        if (avtale.gjeldendeInnhold.startDato) {
            return {
                minDate: sjekkMuligMinDato(maksDato),
                maxDate: startdatoPluss(maksDato, 'years'),
            };
        }
        return {
            minDate: sjekkMuligMinDato(maksDato),
            maxDate: sluttDatoFraDagensDato(maksDato, 'years'),
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

import { AvtaleContext } from '@/AvtaleProvider';
import { Kvalifiseringsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { TiltaksType } from '@/types/avtale';
import moment, { DurationInputArg2 } from 'moment';
import { DatepickerLimitations } from 'nav-datovelger';
import { useContext } from 'react';

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
                if (startDatePicker === true) {
                    return sjekkMidlertidigLønnstilskuddDato();
                } else {
                    return sjekkMidlertidigLønnstilskuddDato();
                }
            case 'VARIG_LONNSTILSKUDD':
                return datoDefaultVerdi();
            case 'ARBEIDSTRENING':
                if (startDatePicker === true) {
                    return datoDefaultVerdi();
                } else {
                    if (avtale.gjeldendeInnhold.startDato) {
                        return {
                            minDate: startdatoPluss(1, 'days'),
                            maxDate: startdatoPluss(18, 'months'),
                        };
                    } else {
                        return {
                            minDate: sjekkMuligMinDato(),
                            maxDate: sluttDatoFraDagensDato(18, 'months'),
                        };
                    }
                }

            case 'MENTOR':
                return datoDefaultVerdi();
            case 'INKLUDERINGSTILSKUDD':
                if (startDatePicker === true) {
                    return {
                        minDate: sjekkMuligMinDato(),
                        maxDate: sluttDatoFraDagensDato(1, 'years'),
                    };
                } else {
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
        }
    };

    const sjekkMuligMinDato = () => {
        if (erVeileder) {
            if (avtale.godkjentForEtterregistrering) {
                return INGEN_DATO_SPERRE;
            } else {
                return EN_UKE_SIDEN;
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
                minDate: sjekkMuligMinDato(),
                maxDate: sluttDatoFraDagensDato(maksDato, 'years'),
            };
        }
        if (avtale.gjeldendeInnhold.startDato) {
            return {
                minDate: sjekkMuligMinDato(),
                maxDate: startdatoPluss(maksDato, 'years'),
            };
        }
        return {
            minDate: sjekkMuligMinDato(),
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

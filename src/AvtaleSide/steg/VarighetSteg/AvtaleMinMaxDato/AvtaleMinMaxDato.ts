import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { DatepickerLimitations } from 'nav-datovelger';
import moment, { DurationInputArg2 } from 'moment';
import { useContext } from 'react';
import { Kvalifiseringsgruppe } from '@/AvtaleSide/steg/BeregningTilskudd/Kvalifiseringsgruppe';
import {TiltaksType} from "@/types/avtale";

export const AvtaleMinMaxDato = (): DatepickerLimitations => {
    const INGEN_DATO_SPERRE = undefined;
    const DAGENSDATO = new Date().toISOString();
    const EN_UKE_SIDEN = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();

    const { avtale } = useContext(AvtaleContext);
    const { rolle } = useContext(InnloggetBrukerContext);
    const erVeileder = rolle === 'VEILEDER';

    const startdatoPluss = (megde: number, tidsEnhet: DurationInputArg2): string =>
        moment(avtale.startDato).add(megde, tidsEnhet).format('YYYY-MM-DD');

    const settdatoMidlertidligLonnstilskudd = () => ({
        minDate: sjekkMuligMinDato(),
        maxDate:
            avtale.kvalifiseringsgruppe === Kvalifiseringsgruppe.SITUASJONSBESTEMT_INNSATS ||
            !avtale.kvalifiseringsgruppe
                ? startdatoPluss(1, 'years')
                : startdatoPluss(2, 'years'),
    });

    const settdatoArbeidstrening = () => ({
        minDate: sjekkMuligMinDato(),
        maxDate: startdatoPluss(18, 'months'),
    });

    const settdatoSommerjobb = () => ({
        minDate: new Date(new Date().getFullYear(), 5, 2).toISOString(),
        maxDate: startdatoPluss(4, 'weeks'),
    });

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

    const datoDefaultVerdi = () => ({
        minDate: sjekkMuligMinDato(),
        maxDate: INGEN_DATO_SPERRE,
    });

    const settdatoBegrensningTiltakstype = (tiltakstype: TiltaksType) => {
        switch (tiltakstype) {
            case 'MIDLERTIDIG_LONNSTILSKUDD':
                return settdatoMidlertidligLonnstilskudd();
            case 'ARBEIDSTRENING':
                return settdatoArbeidstrening();
            case 'SOMMERJOBB':
                return settdatoSommerjobb();
            case 'VARIG_LONNSTILSKUDD' :
                return datoDefaultVerdi();
            case 'MENTOR' :
                return datoDefaultVerdi();
        }
    };

    if (avtale.startDato) {
        settdatoBegrensningTiltakstype(avtale.tiltakstype);
    }
    return datoDefaultVerdi();
};

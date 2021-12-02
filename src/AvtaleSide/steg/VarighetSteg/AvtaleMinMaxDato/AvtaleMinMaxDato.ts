import { AvtaleContext } from '@/AvtaleProvider';
import { InnloggetBrukerContext } from '@/InnloggingBoundary/InnloggingBoundary';
import { DatepickerLimitations } from 'nav-datovelger';
import moment, { DurationInputArg2 } from 'moment';
import { useContext } from 'react';

export const AvtaleMinMaxDato = (): DatepickerLimitations => {

    const INGEN_DATO_SPERRE = undefined;
    const DAGENSDATO = new Date().toISOString();
    const veilederEtterregistreringGrense = moment(new Date).subtract(7,'days').format('YYYY-MM-DD');

    const { avtale } = useContext(AvtaleContext);
    const { erNavAnsatt, rolle, kanVæreBeslutter } = useContext(InnloggetBrukerContext);

    const rolleStartdato = () => {
        if(rolle === 'ARBEIDSGIVER'){
            return DAGENSDATO;
        }
        if(rolle === 'VEILEDER' && !kanVæreBeslutter){
            return veilederEtterregistreringGrense;
        }
        if(rolle === 'VEILEDER' && kanVæreBeslutter){
            return INGEN_DATO_SPERRE;
        }
    }

    const startdatoPluss = (megde: number, tidsEnhet: DurationInputArg2): string =>
        moment(avtale.startDato).add(megde, tidsEnhet).format('YYYY-MM-DD');

    const settdatoMidlertidligLonnstilskudd = () => ({
        minDate: rolleStartdato(),
        maxDate: startdatoPluss(2,'years')
    });

    const settdatoArbeidstrening = () => ({
        minDate: rolleStartdato(), maxDate: startdatoPluss(18, 'months'),
    });

    const settdatoSommerjobb = () => ({
        minDate: new Date(new Date().getFullYear(), 5, 2).toISOString(),
        maxDate: startdatoPluss(4, 'weeks'),
    });

    const settdatoDefaultVerdi = () => ({
        minDate: rolleStartdato(), maxDate: INGEN_DATO_SPERRE,
    });

    const settdatoBegrensningTiltakstype = (tiltakstype: string) => {
        switch (tiltakstype) {
            case 'MIDLERTIDIG_LONNSTILSKUDD':
                return settdatoMidlertidligLonnstilskudd();
            case 'ARBEIDSTRENING':
                return settdatoArbeidstrening();
            case 'SOMMERJOBB':
                return settdatoSommerjobb();
            default:
                return { minDate: erNavAnsatt ? INGEN_DATO_SPERRE : DAGENSDATO, maxDate: INGEN_DATO_SPERRE };
        }
    }

if (avtale.startDato) {
    settdatoBegrensningTiltakstype(avtale.tiltakstype);
}

return settdatoDefaultVerdi();
};
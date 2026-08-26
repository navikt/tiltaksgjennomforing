import { Duration, sub, max, parse } from 'date-fns';
import { useCallback, useMemo } from 'react';

import useInnlogget from '@/InnloggingBoundary/useInnlogget';
import { datoFraDagensDato, datoMinus, datoPluss } from '@/utils/datoUtils';
import { useAvtale } from '@/AvtaleProvider';
import { Innsatsgruppe } from '@/types/innsatsgruppe';
import { DatePickerProps } from '@navikt/ds-react';

type TilOgFraDato = Pick<DatePickerProps, 'fromDate' | 'toDate'>;

const useSjekkFraDato = (erStartdatoDatepicker: boolean) => {
    const { innloggetBruker } = useInnlogget();
    const { avtale } = useAvtale();
    const { gjeldendeInnhold, godkjentForEtterregistrering } = avtale;
    const { startDato, sluttDato } = gjeldendeInnhold;

    const erVeileder = innloggetBruker?.rolle === 'VEILEDER';

    return useCallback(
        (duration?: Duration | undefined) => {
            if (!erVeileder) {
                return new Date();
            }
            if (godkjentForEtterregistrering) {
                return undefined;
            }
            if (erStartdatoDatepicker) {
                const enUkeSiden = sub(new Date(), { weeks: 1 })!;
                const minsteStartdatoBasertPaaSluttdato =
                    duration && sluttDato ? datoMinus(sluttDato, duration) : undefined;
                return minsteStartdatoBasertPaaSluttdato
                    ? max([minsteStartdatoBasertPaaSluttdato, enUkeSiden])
                    : enUkeSiden;
            }
            if (startDato) {
                return parse(startDato, 'yyyy-MM-dd', new Date());
            }
            return undefined;
        },
        [erVeileder, erStartdatoDatepicker, godkjentForEtterregistrering, startDato, sluttDato],
    );
};

export const useAvtaleTilOgFraDato = (erStartdatoDatepicker: boolean): TilOgFraDato => {
    const { avtale } = useAvtale();
    const { tiltakstype, innsatsgruppe, gjeldendeInnhold } = avtale;
    const { startDato, stillingstype, sluttDato } = gjeldendeInnhold;

    const sjekkFraDato = useSjekkFraDato(erStartdatoDatepicker);

    return useMemo(() => {
        switch (tiltakstype) {
            case 'VARIG_LONNSTILSKUDD':
            case 'VTAO':
                return {
                    fromDate: sjekkFraDato(),
                    toDate: undefined,
                };
            case 'SOMMERJOBB': {
                if (!erStartdatoDatepicker && startDato) {
                    return {
                        fromDate: datoPluss(startDato, { days: 1 }),
                        toDate: datoPluss(startDato, { days: 28 }),
                    };
                }
                const sisteMuligeStart = new Date(new Date().getFullYear(), 8, 1);
                const sisteMuligeSlutt = new Date(new Date().getFullYear(), 8, 28);
                return {
                    fromDate: sjekkFraDato(),
                    toDate: erStartdatoDatepicker ? sisteMuligeStart : sisteMuligeSlutt,
                };
            }
            case 'MIDLERTIDIG_LONNSTILSKUDD': {
                const maksVarighet: Duration =
                    !innsatsgruppe?.type || innsatsgruppe?.type === Innsatsgruppe.TRENGER_VEILEDNING
                        ? { years: 1 }
                        : { years: 2 };
                if (!erStartdatoDatepicker && startDato) {
                    return {
                        fromDate: sjekkFraDato(maksVarighet),
                        toDate: datoPluss(startDato, maksVarighet),
                    };
                }
                return {
                    fromDate: sjekkFraDato(maksVarighet),
                    toDate: datoFraDagensDato(maksVarighet),
                };
            }
            case 'ARBEIDSTRENING': {
                const maksVarighet: Duration =
                    !innsatsgruppe?.type || innsatsgruppe?.type === Innsatsgruppe.TRENGER_VEILEDNING
                        ? { months: 12 }
                        : { months: 18 };
                if (!erStartdatoDatepicker && startDato) {
                    return {
                        fromDate: sjekkFraDato(maksVarighet),
                        toDate: datoPluss(startDato, maksVarighet),
                    };
                }
                return {
                    fromDate: sjekkFraDato(maksVarighet),
                    toDate: datoFraDagensDato(maksVarighet),
                };
            }
            case 'MENTOR': {
                const maksVarighet: Duration =
                    !innsatsgruppe?.type || innsatsgruppe?.type === Innsatsgruppe.TRENGER_VEILEDNING
                        ? { months: 6 }
                        : { months: 36 };
                if (!erStartdatoDatepicker && startDato) {
                    return {
                        fromDate: sjekkFraDato(maksVarighet),
                        toDate: datoPluss(startDato, maksVarighet),
                    };
                }
                return {
                    fromDate: sjekkFraDato(maksVarighet),
                    toDate: datoFraDagensDato(maksVarighet),
                };
            }
            case 'INKLUDERINGSTILSKUDD': {
                const maksVarighet: Duration = { years: 1 };
                if (!erStartdatoDatepicker && startDato) {
                    return {
                        fromDate: parse(startDato, 'yyyy-MM-dd', new Date()),
                        toDate: datoPluss(startDato, maksVarighet),
                    };
                } else {
                    return {
                        fromDate: sjekkFraDato(maksVarighet),
                        toDate: datoFraDagensDato(maksVarighet),
                    };
                }
            }
            case 'FIREARIG_LONNSTILSKUDD': {
                const maksVarighet: Duration = stillingstype === 'MIDLERTIDIG' ? { years: 2 } : { years: 4 };
                if (!erStartdatoDatepicker && startDato) {
                    return {
                        fromDate: sjekkFraDato(maksVarighet),
                        toDate: datoPluss(startDato, maksVarighet),
                    };
                }
                return {
                    fromDate: sjekkFraDato(maksVarighet),
                    toDate: datoFraDagensDato(maksVarighet),
                };
            }
        }
    }, [sjekkFraDato, erStartdatoDatepicker, tiltakstype, innsatsgruppe, startDato, sluttDato, stillingstype]);
};

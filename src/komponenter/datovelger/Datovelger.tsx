import { AvtaleContext } from '@/AvtaleProvider';
import { Avtaleinnhold } from '@/types/avtale';
import { DateValidationT, DatePicker, useDatepicker } from '@navikt/ds-react';
import { FunctionComponent, PropsWithChildren, useContext, useState } from 'react';
import { formaterDatoHvisDefinert } from '@/utils/datoUtils';
import { useAvtaleMinMaxDato } from './useAvtaleMinMaxDato';

interface Props {
    datoFelt: keyof Pick<Avtaleinnhold, 'startDato' | 'sluttDato'>;
    label: string;
    readOnly?: boolean;
}

const Datovelger: FunctionComponent<Props> = ({ label, datoFelt, readOnly }: PropsWithChildren<Props>) => {
    const { avtale, settAvtaleInnholdVerdier } = useContext(AvtaleContext);

    const fjernTid = (timestamp: string) => timestamp.split('T')[0];
    const erStartdato = datoFelt === 'startDato';
    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string | undefined>();
    const { minDate, maxDate } = useAvtaleMinMaxDato(erStartdato);

    const feilmelding = (val: DateValidationT | undefined, nedreGrense: string, ovreGrense: string) => {
        if (!val || val.isValidDate) {
            setFeilmeldingTekst(undefined);
            return;
        }
        const datoTekst = erStartdato ? 'Startdato' : 'Sluttdato';
        if (val.isBefore) {
            setFeilmeldingTekst(`${datoTekst} kan ikke være tidligere enn ${nedreGrense}`);
        } else if (val.isAfter) {
            setFeilmeldingTekst(`${datoTekst} kan ikke være senere enn ${ovreGrense}`);
        } else {
            setFeilmeldingTekst(`${datoTekst} er ikke gyldig dato`);
        }
    };

    const { datepickerProps, inputProps } = useDatepicker({
        fromDate: new Date(fjernTid(minDate || '')),
        toDate: new Date(fjernTid(maxDate || '')),
        inputFormat: 'dd.MM.yyyy',
        defaultSelected: avtale.gjeldendeInnhold[datoFelt] ? new Date(avtale.gjeldendeInnhold[datoFelt]!) : undefined,
        onDateChange: (dato) => {
            settAvtaleInnholdVerdier({
                [datoFelt]: formaterDatoHvisDefinert(dato?.toDateString(), 'yyyy-MM-dd'),
            });
        },
        onValidate: (val) => {
            feilmelding(
                val,
                formaterDatoHvisDefinert(datepickerProps.fromDate?.toDateString()) || 'ugyldig dato',
                formaterDatoHvisDefinert(datepickerProps.toDate?.toDateString()) || 'ugyldig dato',
            );
        },
    });

    return (
        <div>
            <DatePicker {...datepickerProps}>
                <DatePicker.Input
                    {...inputProps}
                    readOnly={readOnly}
                    placeholder="dd.mm.åååå"
                    error={feilmeldingTekst}
                    label={label}
                />
            </DatePicker>
        </div>
    );
};

export default Datovelger;

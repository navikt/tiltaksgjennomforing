import { AvtaleContext } from '@/AvtaleProvider';
import { Avtaleinnhold } from '@/types/avtale';
import { DateValidationT, DatePicker, useDatepicker } from '@navikt/ds-react';
import { FunctionComponent, PropsWithChildren, useContext, useState } from 'react';
import { formaterDatoHvisDefinert } from '@/utils/datoUtils';
import { AvtaleMinMaxDato } from '@/AvtaleSide/steg/VarighetSteg/AvtaleMinMaxDato/AvtaleMinMaxDato';

interface Props {
    datoFelt: keyof Pick<Avtaleinnhold, 'startDato' | 'sluttDato'>;
    label: string;
}

const Datovelger: FunctionComponent<Props> = ({ label, datoFelt }: PropsWithChildren<Props>) => {
    const { avtale, settAvtaleInnholdVerdier } = useContext(AvtaleContext);

    const fjernTid = (timestamp: string) => timestamp.split('T')[0];
    const erStartdato = datoFelt === 'startDato';
    const [hasError, setHasError] = useState<boolean>(false);
    const [feilmeldingTekst, setFeilmeldingTekst] = useState<string>();

    const feilmelding = (val: DateValidationT | undefined, nedreGrensese: string, øvreGrense: string) => {
        if (val) {
            if (!val.isValidDate) {
                if (erStartdato) {
                    if (val.isBefore) {
                        setFeilmeldingTekst('Startdato kan ikke være tidligere enn ' + nedreGrensese);
                        setHasError(val.isBefore);
                    } else if (val.isAfter) {
                        setFeilmeldingTekst('Startdato kan ikke være senere enn ' + øvreGrense);
                        setHasError(val.isAfter);
                    } else {
                        setFeilmeldingTekst('Startdato er ikke gyldig dato');
                        setHasError(!val.isValidDate);
                    }
                } else {
                    if (val.isBefore) {
                        setFeilmeldingTekst('Sluttdato kan ikke være tidligere enn ' + nedreGrensese);
                        setHasError(val.isBefore);
                    } else if (val.isAfter) {
                        setFeilmeldingTekst('Sluttdato kan ikke være senere enn ' + øvreGrense);
                        setHasError(val.isAfter);
                    } else {
                        setFeilmeldingTekst('Sluttdato er ikke gyldig dato');
                        setHasError(!val.isValidDate);
                    }
                }
            } else {
                setHasError(false);
            }
        }
    };

    const { datepickerProps, inputProps } = useDatepicker({
        fromDate: new Date(fjernTid(AvtaleMinMaxDato(erStartdato).minDate || '')),
        toDate: new Date(fjernTid(AvtaleMinMaxDato(erStartdato).maxDate || '')),
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
                formaterDatoHvisDefinert(datepickerProps.fromDate?.toDateString()),
                formaterDatoHvisDefinert(datepickerProps.toDate?.toDateString()),
            );
        },
    });

    return (
        <div>
            <label className="skjemaelement__label">{label}</label>
            <DatePicker {...datepickerProps}>
                <DatePicker.Input
                    {...inputProps}
                    placeholder="dd.mm.åååå"
                    error={hasError && feilmeldingTekst}
                    label=""
                />
            </DatePicker>
        </div>
    );
};

export default Datovelger;

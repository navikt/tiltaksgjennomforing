import { AvtaleContext } from '@/AvtaleProvider';
import { Avtaleinnhold } from '@/types/avtale';
import { DatePicker, Fieldset, useDatepicker } from '@navikt/ds-react';
import { useContext } from 'react';
import { formaterDatoHvisDefinert } from '@/utils/datoUtils';
import { ISODateString } from '@/AvtaleSide/steg/VarighetSteg/AvtaleMinMaxDato/AvtaleMinMaxDato';
import { addDays } from 'date-fns';

interface Props {
    datoFelt: keyof Pick<Avtaleinnhold, 'startDato' | 'sluttDato'>;
    legend?: string;
    onChangeHåndtereNyDato: (dato?: string) => Promise<void> | void;
    minDate: ISODateString;
    maxDate?: ISODateString;
    error?: string;
}

const DatovelgerForlengOgForkort = (props: Props) => {
    const { legend, datoFelt, onChangeHåndtereNyDato, minDate, maxDate, error } = props;
    const { avtale } = useContext(AvtaleContext);

    const { datepickerProps, inputProps } = useDatepicker({
        fromDate: new Date(minDate || ''),
        toDate: new Date(maxDate || ''),
        inputFormat: 'dd.MM.yyyy',
        allowTwoDigitYear: false,
        defaultSelected: avtale.gjeldendeInnhold[datoFelt] ? new Date(avtale.gjeldendeInnhold[datoFelt]!) : undefined,
        onValidate: (val) => {
            if (val.isBefore && minDate) {
                return onChangeHåndtereNyDato(
                    formaterDatoHvisDefinert(addDays(minDate, -1).toDateString(), 'yyyy-MM-dd'),
                );
            }
            if (val.isAfter && maxDate) {
                return onChangeHåndtereNyDato(
                    formaterDatoHvisDefinert(addDays(maxDate, 1).toDateString(), 'yyyy-MM-dd'),
                );
            }
            if (val.isInvalid) {
                return onChangeHåndtereNyDato('Invalid');
            }
        },
        onDateChange: (dato) => {
            onChangeHåndtereNyDato(formaterDatoHvisDefinert(dato?.toDateString(), 'yyyy-MM-dd'));
        },
    });

    return (
        <Fieldset legend={legend}>
            <DatePicker {...datepickerProps}>
                <DatePicker.Input {...inputProps} placeholder="dd.mm.åååå" label="" error={error} />
            </DatePicker>
        </Fieldset>
    );
};

export default DatovelgerForlengOgForkort;

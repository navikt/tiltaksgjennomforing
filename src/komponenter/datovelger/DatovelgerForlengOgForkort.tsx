import { DatePicker, Fieldset, useDatepicker } from '@navikt/ds-react';
import { formaterDato, formaterDatoHvisDefinert } from '@/utils/datoUtils';
import { ISODateString } from '@/AvtaleSide/steg/VarighetSteg/AvtaleMinMaxDato/AvtaleMinMaxDato';
import { addDays, format } from 'date-fns';

interface Props {
    legend?: string;
    onChangeHåndtereNyDato: (dato?: string) => Promise<void> | void;
    minDate: ISODateString;
    maxDate?: ISODateString;
    error?: string;
    value?: string;
}

const DatovelgerForlengOgForkort = (props: Props) => {
    const { legend, onChangeHåndtereNyDato, minDate, maxDate, error, value } = props;

    const { datepickerProps, inputProps } = useDatepicker({
        fromDate: new Date(minDate || ''),
        toDate: new Date(maxDate || ''),
        inputFormat: 'dd.MM.yyyy',
        allowTwoDigitYear: false,
        defaultSelected: value ? new Date(value) : undefined,
        onValidate: (val) => {
            if (val.isBefore && minDate) {
                return onChangeHåndtereNyDato(formaterDato(addDays(minDate, -1), 'yyyy-MM-dd'));
            }
            if (val.isAfter && maxDate) {
                return onChangeHåndtereNyDato(formaterDato(addDays(maxDate, 1), 'yyyy-MM-dd'));
            }
            if (val.isInvalid) {
                return onChangeHåndtereNyDato('Invalid');
            }
        },
        onDateChange: (dato) => {
            onChangeHåndtereNyDato(dato ? formaterDato(dato, 'yyyy-MM-dd') : undefined);
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

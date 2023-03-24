import { AvtaleContext } from '@/AvtaleProvider';
import { Avtaleinnhold } from '@/types/avtale';
import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react';
import { FunctionComponent, PropsWithChildren, useContext } from 'react';
import { formatterDatoHvisDefinert } from '@/utils/datoUtils';
import { ISODateString } from '@/AvtaleSide/steg/VarighetSteg/AvtaleMinMaxDato/AvtaleMinMaxDato';

interface Props {
    datoFelt: keyof Pick<Avtaleinnhold, 'startDato' | 'sluttDato'>;
    label: string;
    onChangeHåndtereNyDato: (dato: string | undefined) => Promise<void>;
    minDate: ISODateString;
    maxDate?: ISODateString;
}

const DatovelgerForlengOgForkort: FunctionComponent<Props> = ({
    label,
    datoFelt,
    onChangeHåndtereNyDato,
    minDate,
    maxDate,
}: PropsWithChildren<Props>) => {
    const { avtale } = useContext(AvtaleContext);

    const { datepickerProps, inputProps } = UNSAFE_useDatepicker({
        fromDate: new Date(minDate || ''),
        toDate: new Date(maxDate || ''),
        inputFormat: 'dd.MM.yyyy',
        defaultSelected: avtale.gjeldendeInnhold[datoFelt] ? new Date(avtale.gjeldendeInnhold[datoFelt]!) : undefined,
        onDateChange: (dato) => {
            onChangeHåndtereNyDato(formatterDatoHvisDefinert(dato?.toDateString(), 'YYYY-MM-DD'));
        },
    });

    return (
        <div>
            <label className="skjemaelement__label">{label}</label>
            <UNSAFE_DatePicker {...datepickerProps}>
                <UNSAFE_DatePicker.Input {...inputProps} placeholder="dd.mm.åååå" label="" />
            </UNSAFE_DatePicker>
        </div>
    );
};

export default DatovelgerForlengOgForkort;

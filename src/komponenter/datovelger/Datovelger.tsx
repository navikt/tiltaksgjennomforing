import { AvtaleContext } from '@/AvtaleProvider';
import { Avtaleinnhold } from '@/types/avtale';
import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import datoUtils from '@/utils/datoUtils';
import { AvtaleMinMaxDato } from '@/AvtaleSide/steg/VarighetSteg/AvtaleMinMaxDato/AvtaleMinMaxDato';

type Props = {
    datoFelt: keyof Pick<Avtaleinnhold, 'startDato' | 'sluttDato'>;
    label: string;
};

const Datovelger: FunctionComponent<Props> = (props) => {
    const { avtale, settAvtaleInnholdVerdier } = useContext(AvtaleContext);

    const defaultDato = avtale.gjeldendeInnhold[props.datoFelt]
        ? new Date(avtale.gjeldendeInnhold[props.datoFelt]!)
        : undefined;

    const fjernTid = (timestamp: string) => timestamp.split('T')[0];
    const erStartdato = props.datoFelt === 'startDato';
    const minDato = new Date(fjernTid(AvtaleMinMaxDato(erStartdato).minDate || ''));
    const maxDato = new Date(fjernTid(AvtaleMinMaxDato(erStartdato).maxDate || ''));

    const { datepickerProps, inputProps } = UNSAFE_useDatepicker({
        fromDate: minDato,
        toDate: maxDato,
        inputFormat: 'dd.MM.yyyy',
        defaultSelected: defaultDato,
        onDateChange: (dato) => {
            settAvtaleInnholdVerdier({
                [props.datoFelt]: datoUtils.formatterDatoHvisDefinert(dato?.toDateString(), 'YYYY-MM-DD'),
            });
        },
    });

    return (
        <div>
            <label className="skjemaelement__label">{props.label}</label>
            <UNSAFE_DatePicker {...datepickerProps}>
                <UNSAFE_DatePicker.Input {...inputProps} placeholder="dd.mm.åååå" label="" />
            </UNSAFE_DatePicker>
        </div>
    );
};

export default Datovelger;

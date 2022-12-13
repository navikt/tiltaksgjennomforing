import { AvtaleContext } from '@/AvtaleProvider';
import { Avtaleinnhold } from '@/types/avtale';
import { formatterDatoHvisDefinert } from '@/utils/datoUtils';
import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react';
import { FunctionComponent, useContext } from 'react';
import { AvtaleMinMaxDato } from '../AvtaleSide/steg/VarighetSteg/AvtaleMinMaxDato/AvtaleMinMaxDato';

type Props = {
    datoFelt: keyof Pick<Avtaleinnhold, 'startDato' | 'sluttDato'>;
    label: string;
};

const DatovelgerUtrygg: FunctionComponent<Props> = (props) => {
    const avtaleContext = useContext(AvtaleContext);

    const defaultDato = avtaleContext.avtale.gjeldendeInnhold[props.datoFelt]
        ? new Date(avtaleContext.avtale.gjeldendeInnhold[props.datoFelt]!)
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
            avtaleContext.settAvtaleInnholdVerdier({
                [props.datoFelt]: formatterDatoHvisDefinert(dato?.toDateString(), 'YYYY-MM-DD'),
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

export default DatovelgerUtrygg;